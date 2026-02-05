const express = require('express');
const path = require('path');
const app = express();

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes with EJS
app.get('/', (req, res) => {
  res.render('simulation/landing');
});

app.get('/analytics', (req, res) => {
  res.render('admin/dashboard');
});

app.get('/training', (req, res) => {
  res.render('training/landing');
});

// Test route
app.get('/test', (req, res) => {
  res.send('✅ All systems working');
});

module.exports = app;
