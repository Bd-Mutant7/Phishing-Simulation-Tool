// api/render.js - Handles EJS rendering
const path = require('path');
const ejs = require('ejs');
const fs = require('fs').promises;

module.exports = async (req, res) => {
  try {
    // Determine which EJS file to render
    let ejsFile = 'index.ejs';
    
    if (req.url === '/login' || req.url === '/login/') {
      ejsFile = 'login.ejs';
    }
    
    // Path to EJS file
    const ejsPath = path.join(__dirname, '../views', ejsFile);
    
    // Check if file exists
    try {
      await fs.access(ejsPath);
    } catch {
      ejsFile = 'index.ejs'; // Fallback to index
    }
    
    // Render EJS
    const html = await ejs.renderFile(ejsPath, {
      title: 'Phishing Simulation Tool',
      page: ejsFile.replace('.ejs', ''),
      timestamp: new Date().toISOString()
    });
    
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
    
  } catch (error) {
    console.error('EJS Render Error:', error);
    res.status(500).send(`
      <html>
        <body>
          <h1>Server Error</h1>
          <p>${error.message}</p>
          <p>Check Vercel logs for details.</p>
        </body>
      </html>
    `);
  }
};
