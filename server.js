const express = require('express');
const app = express();

// Basic test route
app.get('/test', (req, res) => {
  res.send('✅ Server is working at /test');
});

// Home route
app.get('/', (req, res) => {
  res.send('✅ Home page is working');
});

// Analytics route (simple for now)
app.get('/analytics', (req, res) => {
  res.send('✅ Analytics page is working');
});

// Training route
app.get('/training', (req, res) => {
  res.send('✅ Training page is working');
});

// Error handling
app.use((req, res) => {
  res.status(404).send('❌ Page not found');
});

// Don't use app.listen() for Vercel
// Just export the app
module.exports = app;
