// Placeholder package data. Swap this for a real API/database call once
// the admin panel (Phase 2) is built — the rest of the app only relies on
// this shape, so pages won't need to change.

export const packages = [
  {
    id: "bridal-classic",
    name: "Classic Bridal",
    price: "৳15,000",
    coverImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=1000&fit=crop",
    shortDesc: "Timeless bridal look with soft glam and long-lasting finish.",
    fullDesc:
      "A refined, camera-ready bridal look built to last through a full day of ceremonies. Skin is prepped, corrected, and set for humidity, with soft-glam eyes and a lip shade matched to your outfit.",
    includes: [
      "Skin prep & HD foundation",
      "Soft-glam eye makeup",
      "False lashes",
      "Contour & highlight",
      "Long-wear setting spray",
      "Touch-up kit for the day",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=900&h=1100&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&h=1100&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&h=1100&fit=crop",
    ],
  },
  {
    id: "premium-bridal",
    name: "Premium Bridal",
    price: "৳25,000",
    coverImage: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=1000&fit=crop",
    shortDesc: "Full glam with airbrush finish, hair styling, and trial session.",
    fullDesc:
      "Our most complete bridal package — airbrush makeup for a flawless finish on camera, a complimentary trial session before the big day, hair styling, and premium false lashes.",
    includes: [
      "Airbrush foundation",
      "Trial session included",
      "Hair styling",
      "Premium lashes & jewel detailing",
      "Draping assistance",
      "Full-day touch-up kit",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&h=1100&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=900&h=1100&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=1100&fit=crop",
    ],
  },
  {
    id: "party-makeup",
    name: "Party Makeup",
    price: "৳6,000",
    coverImage: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=1000&fit=crop",
    shortDesc: "Bold, radiant makeup for engagements, receptions, and events.",
    fullDesc:
      "A statement look for any celebration — dewy or matte finish, your choice of a bold or soft eye, and a colour palette tailored to your outfit.",
    includes: [
      "Skin prep & foundation",
      "Eye makeup (bold or soft)",
      "False lashes",
      "Setting spray",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&h=1100&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=1100&fit=crop",
    ],
  },
  {
    id: "engagement-look",
    name: "Engagement Look",
    price: "৳10,000",
    coverImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1000&fit=crop",
    shortDesc: "Soft, romantic makeup for the day you say yes.",
    fullDesc:
      "A softer, romantic take on bridal glam — designed to photograph beautifully while still feeling like you, with a lighter base and warm, flushed tones.",
    includes: [
      "Skin prep & light-coverage base",
      "Soft eye makeup",
      "Natural lashes",
      "Dewy finish setting spray",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=1100&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&h=1100&fit=crop",
    ],
  },
  {
    id: "pre-wedding-shoot",
    name: "Pre-Wedding Shoot",
    price: "৳8,000",
    coverImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1000&fit=crop",
    shortDesc: "Camera-ready makeup designed for outdoor & studio shoots.",
    fullDesc:
      "Makeup tuned specifically for the camera — colour-corrected, shine-controlled, and built to hold up across multiple outfit changes and locations.",
    includes: [
      "Photo-ready base",
      "Two look changes",
      "Touch-ups between outfits",
      "Hair touch-up",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&h=1100&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=900&h=1100&fit=crop",
    ],
  },
]

export const getPackageById = (id) => packages.find((p) => p.id === id)
