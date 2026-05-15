require('dotenv').config();

const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const seedDatabase = require('./config/seed');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

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

app.get('/', (req, res) => {
  res.json({ message: 'Tupas Lab Activity 7 API is running' });
});

app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();
  await seedDatabase();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
