# Admin Panel Setup Instructions

## Phase 2: MongoDB + Admin Panel for Rose Bridal Studio

This guide walks you through setting up the admin panel so Rose can manage her packages without touching code.

---

## Step 1: Create MongoDB Atlas Cluster (Free Tier)

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas/register
2. **Sign up** for a free account (or log in)
3. **Create a new cluster**:
   - Click "Build a Database" → Choose "M0 FREE" tier
   - Select a region close to Bangladesh (e.g., AWS - Mumbai or Singapore)
   - Cluster Name: `rosebridalstudio` (or keep default)
   - Click "Create Cluster"
4. **Set up database access**:
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Username: `roseadmin`
   - Password: Generate a secure password (save this!)
   - Role: "Read and write to any database"
   - Click "Add User"
5. **Allow network access**:
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (adds `0.0.0.0/0`)
   - Click "Confirm"
6. **Get connection string**:
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Drivers"
   - Copy the connection string (looks like: `mongodb+srv://roseadmin:<password>@cluster0.xxxxx.mongodb.net/`)
   - Replace `<password>` with the actual password you created
   - Save this full string — this is your `MONGODB_URI`

---

## Step 2: Set Up Local Environment Variables

1. **Create `.env` file** in project root:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** with your values:
   ```env
   MONGODB_URI=mongodb+srv://roseadmin:your-actual-password@cluster0.xxxxx.mongodb.net/
   JWT_SECRET=your-random-secret-key-here-use-something-long-and-random
   ```

   For `JWT_SECRET`, use a random string like:
   ```
   JWT_SECRET=R0s3Br1d4l!SecureT0k3nK3y#2024$Bangladesh
   ```

---

## Step 3: Run Seed Script (One-Time Setup)

This migrates your existing package data to MongoDB and creates your admin login.

```bash
node scripts/seed-db.js
```

**Output will show:**
```
✓ Inserted 5 packages
✓ Created admin user

========================================
ADMIN LOGIN CREDENTIALS:
Email: admin@rosebridalstudio.com
Password: RoseBridal2024!
========================================

⚠️  IMPORTANT: Please change the password after your first login!
```

**Save these credentials!** You'll use them to log into `/admin/login`.

---

## Step 4: Test Locally

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Visit admin login**: http://localhost:5173/admin/login
3. **Log in** with credentials from seed script
4. **Test CRUD operations**:
   - View all packages
   - Add a new package
   - Edit an existing package
   - Delete a package
   - Log out

5. **Verify public pages still work**:
   - Check `/packages` loads from MongoDB
   - Check `/packages/:id` detail page works

---

## Step 5: Deploy to Vercel with Environment Variables

1. **Push code to Git** (if not already):
   ```bash
   git add .
   git commit -m "Add admin panel with MongoDB integration"
   git push
   ```

2. **Go to Vercel Dashboard**: https://vercel.com/dashboard
3. **Select your project** (Rose Bridal Studio)
4. **Go to Settings → Environment Variables**
5. **Add two variables**:

   | Name | Value | Environments |
   |------|-------|--------------|
   | `MONGODB_URI` | Your full MongoDB connection string | Production, Preview, Development |
   | `JWT_SECRET` | Your random secret key | Production, Preview, Development |

6. **Redeploy**:
   - Go to "Deployments" tab
   - Click "Redeploy" on latest deployment (or push a new commit)
   - Wait for build to complete

---

## Step 6: Access Live Admin Panel

1. **Visit your live site**: https://your-domain.vercel.app/admin/login
2. **Log in** with same credentials
3. **Manage packages** from anywhere!

---

## Security Notes

- ✅ Passwords are hashed with bcrypt before storage
- ✅ Admin routes require JWT token authentication
- ✅ Write operations (POST/PUT/DELETE) check for valid token
- ✅ Public GET endpoints don't require auth (needed for public site)
- ⚠️ **Change default password** after first login (you can do this by re-running seed with a different password, or manually in MongoDB)

---

## Troubleshooting

### "Failed to fetch packages" on public site
- Check that MongoDB Atlas is running
- Verify `MONGODB_URI` is correct in Vercel environment variables
- Check Network Access allows `0.0.0.0/0`

### "Unauthorized" when trying to save
- Make sure you're logged in at `/admin/login`
- Clear browser localStorage and log in again
- Verify `JWT_SECRET` matches between local and Vercel

### Can't connect to MongoDB
- Ensure IP whitelist includes `0.0.0.0/0` (for development)
- Double-check username/password in connection string
- Test connection string locally first

---

## File Structure Summary

```
/workspace
├── api/                      # Vercel Serverless Functions
│   ├── lib/
│   │   ├── db.js            # MongoDB connection helper
│   │   └── auth.js          # JWT token utilities
│   ├── packages.js          # GET all/single, POST new package
│   └── auth/
│       └── login.js         # POST login endpoint
├── scripts/
│   └── seed-db.js           # One-time seed script
├── src/
│   ├── pages/
│   │   ├── Packages.jsx     # Now fetches from /api/packages
│   │   ├── PackageDetail.jsx # Now fetches from /api/packages/:id
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       └── AdminDashboard.jsx
│   └── App.jsx              # Added admin routes
├── .env.example             # Template for environment variables
└── src/data/packages.js     # Kept as reference/fallback
```

---

## Next Steps (Optional Future Enhancements)

- [ ] Add image upload (currently uses URL strings)
- [ ] Add testimonial management
- [ ] Add booking inquiry management
- [ ] Add analytics dashboard
- [ ] Add multiple admin users with roles

---

**Need help?** Check MongoDB Atlas logs, Vercel function logs, or browser console for error messages.
