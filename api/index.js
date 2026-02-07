const path = require('path');
const ejs = require('ejs');

module.exports = async (req, res) => {
  // If accessing /api/*, show JSON
  if (req.url.startsWith('/api/')) {
    return res.json({
      api: true,
      message: 'API endpoint',
      path: req.url
    });
  }
  
  // Otherwise, render EJS file
  try {
    const html = await ejs.renderFile(
      path.join(__dirname, '../views/index.ejs'),
      { title: 'Phishing Simulation Tool' }
    );
    
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  } catch (error) {
    res.status(500).send('Error loading page: ' + error.message);
  }
};
