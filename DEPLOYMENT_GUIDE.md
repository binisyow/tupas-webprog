# Vercel Deployment Instructions

## Prerequisites
- Node.js and npm installed
- Git repository initialized and pushed to GitHub/GitLab/Bitbucket
- Vercel account (https://vercel.com)
- MongoDB Atlas account with connection string

## Step 1: Set Up Environment Variables

### For MongoDB
1. Create a MongoDB Atlas account at https://mongodb.com/cloud/atlas
2. Create a free tier cluster
3. Get your connection string (replace username and password)

### Local Development
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Then update `.env.local` with your values:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-jwt-key-here
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project root
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Set deployment directory to: tupas-webprog-lab-act2
# - Add environment variables when prompted
```

### Option B: Using GitHub Integration
1. Push your project to GitHub
2. Go to https://vercel.com and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Select the root directory as project root
6. Add environment variables in Settings → Environment Variables:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production
7. Deploy!

## Step 3: Configure Environment Variables in Vercel

In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add these variables:
   ```
   MONGO_URI = your_mongodb_connection_string
   JWT_SECRET = your_jwt_secret_key
   NODE_ENV = production
   ```

## Step 4: Update API URL in Production

The client's `.env.production` file is set to use `/api` which will work with your Vercel deployment.

Your deployment will have:
- Frontend: https://your-project.vercel.app
- API: https://your-project.vercel.app/api

## Step 5: Verify Deployment

After deployment:
1. Visit your Vercel URL
2. Check browser console for any errors
3. Test API calls (login, articles, etc.)
4. Check Vercel logs for server errors:
   ```bash
   vercel logs your-project-name
   ```

## Troubleshooting

### Database connection errors
- Verify MongoDB Atlas network access (add 0.0.0.0/0 for Vercel)
- Check MONGO_URI is correctly set in Vercel environment

### CORS errors
- Ensure CORS is properly configured for your Vercel domain

### API calls failing
- Check that environment variables are set correctly
- Verify `.env.production` in client uses `/api`

## Local Development

To run locally:
```bash
# In root directory
npm install

# Terminal 1: Start server
cd tupas-server
npm install
npm run dev

# Terminal 2: Start client
cd tupas-client
npm install
npm run dev
```
