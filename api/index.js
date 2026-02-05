// api/index.js
const express = require('express');
const path = require('path');
const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/analytics', (req, res) => {
  res.render('dashboard'); // or create analytics.ejs
});

app.get('/report', (req, res) => {
  res.render('campaigns'); // or create report.ejs
});

app.get('/training', (req, res) => {
  res.render('training/landing');
});

app.get('/user-settings', (req, res) => {
  res.render('employees'); // or create settings.ejs
});

app.get('/campaigns', (req, res) => {
  res.render('campaigns');
});

app.get('/campaigns/new', (req, res) => {
  res.render('campaign-new');
});

app.get('/campaigns/:id', (req, res) => {
  res.render('campaign-detail');
});

app.get('/employees', (req, res) => {
  res.render('employees');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/admin', (req, res) => {
  res.render('admin/landing');
});

// Handle 404
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Export for Vercel
module.exports = app;
