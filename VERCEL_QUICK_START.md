# Vercel Deployment - Quick Start Guide

## ✅ Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] GitHub/GitLab/Bitbucket account with your code pushed
- [ ] Vercel account (free at https://vercel.com)
- [ ] MongoDB Atlas account with a connection string
- [ ] Updated `.env.local` with your MONGO_URI and JWT_SECRET

## 🚀 Quick Deploy Steps

### 1. Get Your MongoDB Connection String

1. Go to [MongoDB Atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Go to "Database" → "Connect" → "Drivers"
4. Copy the connection string
5. Replace `<password>` with your database password

### 2. Update Local Environment

Edit `.env.local` in the root directory:
```bash
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/tupas-db
JWT_SECRET=any-strong-secret-key-here
```

### 3. Test Locally First

```bash
# Install dependencies
npm install
cd tupas-client && npm install
cd ../tupas-server && npm install
cd ..

# Run both client and server
npm run dev
```

Then visit http://localhost:5173 and test your app.

### 4. Deploy to Vercel

**Option A: Using Vercel CLI (Fastest)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the interactive prompts
```

**Option B: GitHub Integration**
1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Select "Import Git Repository"
4. Choose your project
5. Vercel auto-detects the settings
6. Click "Deploy"

### 5. Set Environment Variables in Vercel

After deployment starts:
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secret key
   - `NODE_ENV`: `production`
4. Click "Save" and redeploy

### 6. Update MongoDB Network Access

1. Go to MongoDB Atlas
2. Network Access → IP Whitelist
3. Click "Add IP Address"
4. Enter `0.0.0.0/0` (allows Vercel IPs)
5. Confirm

## 📍 After Deployment

Your URLs will be:
- **Frontend**: https://your-project.vercel.app
- **API**: https://your-project.vercel.app/api

The client automatically uses `/api` in production (`.env.production`).

## 🧪 Test Your Deployment

1. Visit your Vercel URL
2. Try logging in
3. Create/view articles
4. Check Vercel logs for errors:
   ```bash
   vercel logs your-project-name
   ```

## 🆘 Troubleshooting

### "Cannot connect to database"
- Check MONGO_URI is set correctly in Vercel dashboard
- Whitelist `0.0.0.0/0` in MongoDB Atlas

### "API 404 errors"
- Ensure `.env.production` exists in `tupas-client/`
- Should contain: `VITE_API_URL=/api`

### "CORS errors"
- Already configured in `api/handler.js`
- Should work automatically

### Check Logs
```bash
# View Vercel logs
vercel logs your-project-name --tail

# Or in Vercel dashboard: Deployments → Logs
```

## 📚 Project Structure

```
tupas-webprog-lab-act2/
├── api/                    # Vercel serverless API
├── tupas-client/          # React frontend (Vite)
├── tupas-server/          # Express server code
├── vercel.json           # Vercel configuration
├── .env.local            # Local environment variables
└── DEPLOYMENT_GUIDE.md   # Detailed guide
```

## 🔗 Useful Links

- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas](https://mongodb.com/cloud/atlas)
- [Express on Vercel](https://vercel.com/docs/functions/serverless-functions)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)
