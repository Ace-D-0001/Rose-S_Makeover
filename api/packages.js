// Use Node.js runtime instead of Edge for full MongoDB and bcrypt support
export const config = {
  runtime: 'nodejs',
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    const { connectToDatabase } = await import('./lib/db.js');
    const { db } = await connectToDatabase();

    if (id) {
      // Get single package
      const pkg = await db.collection('packages').findOne({ id });
      if (!pkg) {
        return new Response(JSON.stringify({ error: 'Package not found' }), {
          status: 404,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
      return new Response(JSON.stringify(pkg), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } else {
      // Get all packages
      const packages = await db.collection('packages').find({}).toArray();
      return new Response(JSON.stringify(packages), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  } catch (error) {
    console.error('Error fetching packages:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch packages' }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

export async function POST(req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // Check authorization
  const authHeader = req.headers.get('authorization');
  const { getTokenFromHeader, verifyToken } = await import('./lib/auth.js');
  const token = getTokenFromHeader(authHeader);

  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  try {
    const body = await req.json();
    const { connectToDatabase } = await import('./lib/db.js');
    const { db } = await connectToDatabase();

    // Check if package with this ID already exists
    const existing = await db.collection('packages').findOne({ id: body.id });
    if (existing) {
      return new Response(JSON.stringify({ error: 'Package with this ID already exists' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const newPackage = {
      ...body,
      createdAt: new Date(),
    };

    await db.collection('packages').insertOne(newPackage);

    return new Response(JSON.stringify({ success: true, package: newPackage }), {
      status: 201,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error creating package:', error);
    return new Response(JSON.stringify({ error: 'Failed to create package' }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
