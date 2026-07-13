// Seed script to populate MongoDB with initial data
// Run this once after setting up your MongoDB Atlas cluster
// Usage: node scripts/seed-db.js

import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { packages } from '../src/data/packages.js';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = 'rosebridalstudio';

if (!uri) {
  console.error('Error: MONGODB_URI environment variable is not set');
  console.log('Please create a .env file with your MongoDB connection string');
  console.log('Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/');
  process.exit(1);
}

async function seedDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const db = client.db(dbName);

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing collections...');
    await db.collection('packages').deleteMany({});
    await db.collection('admins').deleteMany({});

    // Insert packages
    console.log('\nInserting packages...');
    const packagesResult = await db.collection('packages').insertMany(packages);
    console.log(`✓ Inserted ${packagesResult.insertedCount} packages`);

    // Create admin user
    console.log('\nCreating admin user...');
    const saltRounds = 10;
    const plainPassword = 'RoseBridal2024!'; // Default password - change after first login!
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    const adminUser = {
      email: 'admin@rosebridalstudio.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
    };

    const adminResult = await db.collection('admins').insertOne(adminUser);
    console.log('✓ Created admin user');
    console.log('\n========================================');
    console.log('ADMIN LOGIN CREDENTIALS:');
    console.log('Email: admin@rosebridalstudio.com');
    console.log('Password: RoseBridal2024!');
    console.log('========================================');
    console.log('\n⚠️  IMPORTANT: Please change the password after your first login!');
    console.log('\nSeed completed successfully! 🎉');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed');
  }
}

seedDatabase();
