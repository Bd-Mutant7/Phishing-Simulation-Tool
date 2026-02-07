// api/render.js - ROBUST VERSION
const path = require('path');
const ejs = require('ejs');
const fs = require('fs').promises;

module.exports = async (req, res) => {
  console.log('Request for:', req.url);
  
  try {
    // Determine which page to show
    let ejsFile = 'index.ejs';
    
    if (req.url === '/login' || req.url === '/login/') {
      ejsFile = 'login.ejs';
    }
    
    // Try multiple possible paths
    const possiblePaths = [
      path.join(__dirname, '../views', ejsFile),
      path.join(process.cwd(), 'views', ejsFile),
      path.join('/var/task/views', ejsFile)
    ];
    
    let ejsPath;
    let fileExists = false;
    
    // Check which path works
    for (const tryPath of possiblePaths) {
      try {
        await fs.access(tryPath);
        ejsPath = tryPath;
        fileExists = true;
        console.log('Found EJS at:', tryPath);
        break;
      } catch {
        continue;
      }
    }
    
    if (!fileExists) {
      console.log('EJS file not found, showing fallback');
      return showFallback(res, `File ${ejsFile} not found in views/ folder`);
    }
    
    // Render the EJS file
    const html = await ejs.renderFile(ejsPath, {
      title: 'Phishing Simulation Tool',
      page: ejsFile.replace('.ejs', ''),
      timestamp: new Date().toISOString()
    });
    
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
    
  } catch (error) {
    console.error('Render error:', error);
    showFallback(res, error.message);
  }
};

function showFallback(res, errorMessage) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Phishing Simulation Tool</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        .error { color: #d00; background: #fee; padding: 15px; border-radius: 5px; }
        .links { margin-top: 20px; }
        a { margin-right: 15px; color: #0066cc; }
      </style>
    </head>
    <body>
      <h1>Phishing Simulation Tool</h1>
      <div class="error">
        <strong>Setup Notice:</strong> ${errorMessage}
      </div>
      <p>Your EJS files need to be in the <code>views/</code> folder.</p>
      
      <div class="links">
        <a href="/api">Check API Status</a>
        <a href="/test">Test EJS Page</a>
        <a href="https://github.com/Bd-Mutant7/Phishing-Simulation-Tool">GitHub Repo</a>
      </div>
      
      <p>Timestamp: ${new Date().toISOString()}</p>
    </body>
    </html>
  `;
  
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
}
