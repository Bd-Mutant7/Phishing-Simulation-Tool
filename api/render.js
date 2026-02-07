// api/render.js - FINAL VERSION (uses your real EJS)
const path = require('path');
const ejs = require('ejs');
const fs = require('fs').promises;

module.exports = async (req, res) => {
  try {
    console.log('Rendering:', req.url);
    
    // Map URLs to your EJS files
    let ejsFile = 'index.ejs';
    
    // Add your page routes here
    if (req.url === '/login' || req.url === '/login/') {
      ejsFile = 'login.ejs';
    }
    // Add more: '/dashboard' -> 'dashboard.ejs', etc.
    
    const ejsPath = path.join(__dirname, '../views', ejsFile);
    
    // Check if file exists, fallback to index
    try {
      await fs.access(ejsPath);
    } catch {
      ejsFile = 'index.ejs';
    }
    
    // Render with your actual data
    const html = await ejs.renderFile(
      path.join(__dirname, '../views', ejsFile),
      {
        title: 'Phishing Simulation Tool',
        page: ejsFile.replace('.ejs', ''),
        timestamp: new Date().toISOString(),
        // Add your dynamic data here
        user: null, // Example: Add user data when logged in
        simulations: [] // Example: Add simulation data
      }
    );
    
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
    
  } catch (error) {
    console.error('Render error:', error);
    
    // Fallback to simple error page
    const html = `
      <!DOCTYPE html>
      <html>
      <body>
        <h1>Error Loading Page</h1>
        <p>${error.message}</p>
        <p><a href="/">Home</a> | <a href="/api">API Status</a></p>
      </body>
      </html>
    `;
    res.status(500).end(html);
  }
};
