const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const dentistRoutes = require('./routes/dentistRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000',
      'http://ae04e139535ed407d8d00b0759751347-861699680.us-east-1.elb.amazonaws.com',
      'http://ae04e139535ed407d8d00b0759751347-861699680.us-east-1.elb.amazonaws.com:80',
      'http://ae04e139535ed407d8d00b0759751347-861699680.us-east-1.elb.amazonaws.com:3000'
    ], 
    methods: ['GET', 'POST', 'PATCH', 'PUT'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin.includes('us-east-1.elb.amazonaws.com')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dentist', dentistRoutes);
app.use('/api/booking', bookingRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Node.js server!');
});
module.exports = app;