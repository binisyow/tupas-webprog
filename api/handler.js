require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });

const cors = require('cors');
const express = require('express');
const connectDB = require('../tupas-server/config/db');
const seedDatabase = require('../tupas-server/config/seed');
const userRoutes = require('../tupas-server/routes/userRoutes');
const articleRoutes = require('../tupas-server/routes/articleRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    optionsSuccessStatus: 204,
  }),
);

// Health check (Vercel routes everything under /api to this function)
const healthCheck = (req, res) => {
  res.json({ message: 'Tupas Lab Activity 7 API is running' });
};
app.get('/', healthCheck);
app.get('/api', healthCheck);

// Ensure the database is connected (and seeded) before handling API requests.
// connectDB caches the connection, so this is cheap after the first call.
let seeded = false;

app.use(async (req, res, next) => {
  try {
    await connectDB();
    if (!seeded) {
      await seedDatabase();
      seeded = true;
    }
    next();
  } catch (error) {
    console.error('Database initialization error:', error);
    res.status(503).json({
      message: 'Database connection failed. Check MONGO_URI and MongoDB Atlas network access.',
    });
  }
});

// Routes (requests arrive prefixed with /api on Vercel)
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
