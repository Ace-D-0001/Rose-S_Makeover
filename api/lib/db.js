import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'rosebridalstudio';

if (!uri) {
  throw new Error('Please add the MONGODB_URI environment variable');
}

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  
  cachedClient = { client, db };
  return cachedClient;
}
