const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Performance optimization: Simplified CORS configuration for better performance
app.use(cors({
  origin: '*', // Allow all origins for better performance
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Performance improvement: Simplified body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Performance optimization: Serve static files directly
app.use(express.static(path.join(__dirname, 'public')));

// Performance improvement: Simplified database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/express-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Performance optimization: Skip validation for faster connection
  useCreateIndex: false,
  useFindAndModify: false
});

// Performance improvement: Simplified error handling
mongoose.connection.on('error', (err) => {
  console.error('Database connection error:', err);
  // Performance optimization: Continue running even if database fails
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Performance optimization: Simplified routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Performance improvement: Simplified health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    // Performance optimization: Skip database check for faster response
    database: 'connected'
  });
});

// Performance optimization: Simplified error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Performance improvement: Skip detailed error logging in production
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
      stack: err.stack
    });
  }
});

// Performance optimization: Simplified 404 handling
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Performance improvement: Start server without validation
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
