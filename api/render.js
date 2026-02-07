// api/render.js - FIXED VERSION
const path = require('path');

module.exports = async (req, res) => {
  try {
    console.log('Render request:', req.url);
    
    // Map URLs to EJS files
    let ejsFile = 'index.ejs';
    
    if (req.url === '/login' || req.url === '/login/') {
      ejsFile = 'login.ejs';
    }
    // Add other routes as needed
    
    // IMPORTANT: Use correct path for Vercel
    // In Vercel, files are in /var/task/
    const ejsPath = path.join(process.cwd(), 'views', ejsFile);
    console.log('Looking for EJS file at:', ejsPath);
    
    // Try to require EJS if available, otherwise send simple HTML
    try {
      const ejs = require('ejs');
      const fs = require('fs').promises;
      
      // Check if file exists
      await fs.access(ejsPath);
      
      // Render EJS
      const html = await ejs.renderFile(ejsPath, {
        title: 'Phishing Simulation Tool',
        timestamp: new Date().toISOString()
      });
      
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
      
    } catch (ejsError) {
      // EJS not available or file missing
      console.log('EJS not available, sending fallback');
      sendFallbackHTML(res, ejsFile);
    }
    
  } catch (error) {
    console.error('Render error:', error);
    sendErrorHTML(res, error);
  }
};

function sendFallbackHTML(res, ejsFile) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Phishing Simulation Tool</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: #333; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Phishing Simulation Tool</h1>
        <p>Page: ${ejsFile}</p>
        <p>EJS rendering is being set up. This is a temporary view.</p>
        <p><a href="/api">View API</a> | <a href="/">Home</a></p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      </div>
    </body>
    </html>
  `;
  
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
}

function sendErrorHTML(res, error) {
  const html = `
    <!DOCTYPE html>
    <html>
    <body>
      <h1>Server Error</h1>
      <p>${error.message}</p>
      <p><a href="/">Back to home</a> | <a href="/api">API Status</a></p>
    </body>
    </html>
  `;
  res.status(500).end(html);
}
