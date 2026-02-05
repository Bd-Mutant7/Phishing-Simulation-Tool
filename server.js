const express = require('express');
const path = require('path');
const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('simulation/landing');  // Fixed: views/simulation/landing.ejs
});

app.get('/analytics', (req, res) => {
  res.render('admin/dashboard');  // views/admin/dashboard.ejs
});

app.get('/report', (req, res) => {
  res.render('admin/campaigns');  // views/admin/campaigns.ejs
});

app.get('/training', (req, res) => {
  res.render('training/landing');  // views/training/landing.ejs
});

app.get('/user-settings', (req, res) => {
  res.render('admin/employees');  // views/admin/employees.ejs
});

// Optional: Add login route if you need it
app.get('/login', (req, res) => {
  res.render('admin/login');  // views/admin/login.ejs
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel
module.exports = app;
