const express = require('express');
const path = require('path');
const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/analytics', (req, res) => {
  res.render('dashboard');
});

app.get('/report', (req, res) => {
  res.render('campaigns');
});

app.get('/training', (req, res) => {
  res.render('training/landing');
});

app.get('/user-settings', (req, res) => {
  res.render('employees');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel
module.exports = app;
