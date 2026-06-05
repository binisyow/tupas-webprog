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

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Tupas Lab Activity 7 API is running' });
});

// Initialize database once per serverless instance
let dbInitialized = false;

app.use(async (req, res, next) => {
  if (!dbInitialized) {
    try {
      await connectDB();
      await seedDatabase();
      dbInitialized = true;
      console.log('Database initialized');
    } catch (error) {
      console.error('Database initialization error:', error);
    }
  }
  next();
});

// Routes
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

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
