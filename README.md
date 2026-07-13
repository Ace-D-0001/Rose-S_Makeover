# Ayesha Bridal Studio

Bridal & event makeup artist portfolio website. React (Vite) + React Router +
Tailwind CSS v4 + Framer Motion. Public-facing pages only — no backend, no
admin panel yet (that's a future phase).

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to vercel.com → **Add New Project** → import the repo.
3. Vercel auto-detects Vite — leave the default build settings
   (`npm run build`, output directory `dist`).
4. Click **Deploy**. Done — no extra config needed (a `vercel.json` is
   already included so page refreshes on `/packages/:id` work correctly).

## Before going live — things to personalize

- **`src/data/packages.js`** — replace placeholder Unsplash photos with your
  real portfolio images, and adjust names/prices/descriptions.
- **`src/components/WhatsAppButton.jsx`** — set `WHATSAPP_NUMBER` to your
  real number (format: country code + number, no `+` or leading `0`s,
  e.g. `8801712345678`).
- **`src/pages/PackageDetail.jsx`** — same WhatsApp number is used here too.
- **`src/components/Footer.jsx`** and **`src/pages/Contact.jsx`** — update
  phone, email, and social links.
- **`src/pages/Home.jsx`** and **`src/pages/About.jsx`** — swap in your real
  bio, photos, and testimonials.
- **`src/pages/Contact.jsx`** — the form currently only logs to the console.
  Connect it to Formspree (formspree.io) or EmailJS (emailjs.com) so
  messages actually reach your inbox.

## Project structure

```
src/
  components/   Navbar, Footer, WhatsAppButton, Layout, BrushStroke (shared)
  pages/        Home, About, Packages, PackageDetail, Contact
  data/         packages.js — all package info in one place, ready to be
                swapped for a real database (Supabase/Firebase) later
```
