const express = require('express');
const app = express();

// Test route - should always work
app.get('/test', (req, res) => {
  res.send('✅ Server is working!');
});

// Test EJS rendering
app.get('/test-ejs', (req, res) => {
  res.send('EJS test - change to res.render later');
});

// Your actual routes (commented out for now)
// app.get('/', (req, res) => {
//   res.render('simulation/landing');
// });

app.get('/', (req, res) => {
  res.send('Home page - EJS disabled for testing');
});

app.get('/analytics', (req, res) => {
  res.send('Analytics page - EJS disabled for testing');
});

app.get('/training', (req, res) => {
  res.send('Training page - EJS disabled for testing');
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Error: ' + err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
