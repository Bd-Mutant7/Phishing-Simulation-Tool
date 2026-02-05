const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.get('/', (req, res) => {
  res.render('simulation/landing');
});

app.get('/analytics', (req, res) => {
  res.render('admin/dashboard');
});

app.get('/training', (req, res) => {
  res.render('training/landing');
});

module.exports = app;
