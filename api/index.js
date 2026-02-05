const express = require('express');
const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('HOME PAGE - Working!');
});

app.get('/analytics', (req, res) => {
  res.send('ANALYTICS PAGE - Working!');
});

app.get('/training', (req, res) => {
  res.send('TRAINING PAGE - Working!');
});

app.get('/test', (req, res) => {
  res.send('✅ TEST PAGE - Everything works!');
});

// Export for Vercel serverless
module.exports = app;
