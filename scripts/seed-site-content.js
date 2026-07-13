// Seed script for siteContent collection
// Run this once to initialize site-wide content in MongoDB
// Usage: node scripts/seed-site-content.js

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = 'rosebridalstudio';

if (!uri) {
  console.error('Error: MONGODB_URI environment variable is not set');
  process.exit(1);
}

// Current live content from the existing site
const initialSiteContent = {
  homepage: {
    heroImage: "https://images.unsplash.com/photo-1596704017254-9b1b1c3d0c75?w=1600&h=1400&fit=crop",
    heroTagline: "Bridal Makeup Artist · Dhaka, Bangladesh",
    heroTitle: "Rose Bridal Studio",
    introQuote: "Every bride deserves to look like the most radiant version of herself — not someone else.",
    introText: "I'm Rose, a Dhaka-based makeup artist who has had the honour of getting over 300 brides ready for their big day. My approach blends long-wear, humidity-proof techniques with a soft, natural-glam style — so you look flawless in photos and feel like yourself all night long.",
    ctaTitle: "Ready to plan your bridal look?",
    ctaSubtext: "Let's create something beautiful together for your special day."
  },
  about: {
    portraitImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1000&fit=crop",
    heading: "Hi, I'm Rose",
    bioParagraph1: "I started doing makeup for friends' weddings almost a decade ago, and it slowly became a full-time craft. Since then I've had the privilege of working with brides across Dhaka and beyond — from intimate court marriages to three-day wedding celebrations.",
    bioParagraph2: "My style leans soft-glam: skin-first, long-wearing, and tailored to how you actually want to feel on your wedding day — not a trend, but a version of you that photographs beautifully and holds up through every ritual, dance, and photo.",
    stats: [
      { label: "Brides styled", value: "300+" },
      { label: "Years of experience", value: "8" },
      { label: "Districts served", value: "12" }
    ],
    testimonials: [
      {
        quote: "Rose understood exactly what I wanted and made my Gaye Holud, mehndi, and wedding looks all feel distinct yet cohesive.",
        name: "Nusrat J."
      },
      {
        quote: "My makeup lasted through a 10-hour reception in the middle of monsoon season. Genuinely didn't need a single touch-up.",
        name: "Farhana R."
      }
    ]
  },
  contact: {
    whatsappNumber: "+8801XXX-XXXXXX",
    phoneDisplay: "+880 1XXX-XXXXXX",
    email: "hello@rosebridalstudio.com",
    locationText: "Dhaka, Bangladesh — available for on-location bookings",
    instagramUrl: "#",
    facebookUrl: "#"
  },
  footer: {
    brandName: "Rose Bridal Studio",
    tagline: "Bridal & event makeup artistry based in Dhaka, available for on-location bookings across Bangladesh.",
    copyrightName: "Rose Bridal Studio"
  }
};

async function seedSiteContent() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db(dbName);
    const collection = db.collection('siteContent');
    
    // Check if document already exists
    const existing = await collection.findOne({});
    
    if (existing) {
      console.log('✓ Site content already exists in database.');
      console.log('  If you want to reset it, delete the document manually or run with --force flag');
      await client.close();
      return;
    }
    
    // Insert initial content
    const result = await collection.insertOne(initialSiteContent);
    
    console.log('✓ Site content seeded successfully!');
    console.log(`  Document ID: ${result.insertedId}`);
    console.log('\nInitial content includes:');
    console.log('  - Homepage: hero image, title, tagline, intro quote, CTA');
    console.log('  - About: portrait, bio, stats, testimonials');
    console.log('  - Contact: WhatsApp, phone, email, location, social links');
    console.log('  - Footer: brand name, tagline, copyright');
    console.log('\nYou can now edit this content from the admin dashboard.');
    
    await client.close();
  } catch (error) {
    console.error('Error seeding site content:', error);
    process.exit(1);
  }
}

seedSiteContent();
