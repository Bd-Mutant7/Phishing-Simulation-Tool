const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/analytics', (req, res) => {
  res.render('dashboard'); // or create analytics.ejs
});

app.get('/report', (req, res) => {
  res.render('campaigns'); // or create report.ejs
});

app.get('/campaigns', (req, res) => {
  res.render('campaigns');
});

app.get('/campaigns/new', (req, res) => {
  res.render('campaign-new');
});

app.get('/campaigns/:id', (req, res) => {
  res.render('campaign-detail', { id: req.params.id });
});

app.get('/training', (req, res) => {
  res.render('training/landing');
});

app.get('/employees', (req, res) => {
  res.render('employees');
});

app.get('/admin', (req, res) => {
  res.render('admin/landing'); // adjust path based on your admin folder structure
});

app.get('/login', (req, res) => {
  res.render('login');
});

// API routes for your analytics/report/training/user-settings
app.get('/api/analytics', (req, res) => {
  res.json({ message: 'Analytics data' });
});

app.get('/api/report', (req, res) => {
  res.json({ message: 'Report data' });
});

app.get('/api/training', (req, res) => {
  res.json({ message: 'Training data' });
});

app.get('/api/user-settings', (req, res) => {
  res.json({ message: 'User settings data' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).render('404'); // create 404.ejs if needed
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
