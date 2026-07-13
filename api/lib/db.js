import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'rosebridalstudio';

if (!uri) {
  throw new Error('Please add the MONGODB_URI environment variable');
}

let cachedClient = null;
let cachedPromise = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (cachedPromise) {
    await cachedPromise;
    return cachedClient;
  }

  const client = new MongoClient(uri);
  const connectPromise = client.connect();
  
  try {
    await connectPromise;
    const db = client.db(dbName);
    
    cachedClient = { client, db };
    return cachedClient;
  } catch (error) {
    cachedPromise = null;
    throw error;
  }
}
