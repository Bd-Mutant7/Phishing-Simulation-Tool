// api/render.js - Renders EJS files
const path = require('path');
const fs = require('fs').promises;

module.exports = async (req, res) => {
  try {
    // Default to index.ejs
    let filePath = 'index.ejs';
    
    // Map URLs to EJS files
    if (req.url === '/login' || req.url === '/login/') {
      filePath = 'login.ejs';
    }
    // Add more mappings as needed
    
    const fullPath = path.join(__dirname, '../views', filePath);
    
    // Check if file exists
    try {
      await fs.access(fullPath);
    } catch {
      // Fallback to index if file doesn't exist
      filePath = 'index.ejs';
    }
    
    // Read and send the EJS file
    const content = await fs.readFile(
      path.join(__dirname, '../views', filePath), 
      'utf8'
    );
    
    res.setHeader('Content-Type', 'text/html');
    res.end(content);
    
  } catch (error) {
    console.error('Render error:', error);
    res.status(500).send(`
      <h1>Server Error</h1>
      <p>${error.message}</p>
      <p><a href="/">Back to home</a></p>
    `);
  }
};
