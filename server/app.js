const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const dentistRoutes = require('./routes/dentistRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/dentist', dentistRoutes);
app.use('/api/booking', bookingRoutes);

module.exports = app;