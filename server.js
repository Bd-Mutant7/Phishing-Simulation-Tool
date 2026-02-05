const express = require('express');
const path = require('path');
const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('landing');  // Do you have views/landing.ejs? Or is it in simulation/landing.ejs?
});

app.get('/analytics', (req, res) => {
  res.render('admin/dashboard');  // Fixed path
});

app.get('/report', (req, res) => {
  res.render('admin/campaigns');  // Fixed path
});

app.get('/training', (req, res) => {
  res.render('training/landing');  // Correct
});

app.get('/user-settings', (req, res) => {
  res.render('admin/employees');  // Fixed path
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel
module.exports = app;
