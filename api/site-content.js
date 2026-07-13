// Site Content API - GET (public) and PUT (auth required)
export const config = {
  runtime: 'nodejs',
};

export async function GET(req) {
  try {
    const { connectToDatabase } = await import('./lib/db.js');
    const { db } = await connectToDatabase();
    
    // Get the single siteContent document
    const content = await db.collection('siteContent').findOne({});
    
    if (!content) {
      // Return empty structure if not seeded yet
      return new Response(JSON.stringify({ 
        error: 'Site content not initialized. Run seed script.',
        homepage: {},
        about: {},
        contact: {},
        footer: {}
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
    
    return new Response(JSON.stringify(content), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error fetching site content:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch site content' }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

export async function PUT(req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, OPTIONS',
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

    // Validation - check required fields
    const errors = [];
    
    if (!body.contact?.email || !body.contact.email.includes('@')) {
      errors.push('Valid email is required');
    }
    
    if (!body.contact?.whatsappNumber) {
      errors.push('WhatsApp number is required');
    }
    
    if (!body.footer?.brandName) {
      errors.push('Footer brand name is required');
    }
    
    if (!body.homepage?.heroTitle) {
      errors.push('Homepage hero title is required');
    }

    if (errors.length > 0) {
      return new Response(JSON.stringify({ error: errors.join(', ') }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Update the single document (replace entirely)
    const result = await db.collection('siteContent').findOneAndReplace(
      {},
      body,
      { upsert: true, returnDocument: 'after' }
    );

    return new Response(JSON.stringify({ success: true, content: result.value || result }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error updating site content:', error);
    return new Response(JSON.stringify({ error: 'Failed to update site content' }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
