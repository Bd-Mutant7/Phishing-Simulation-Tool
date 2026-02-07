// api/render.js - TEST EJS VERSION
const path = require('path');
const fs = require('fs').promises;

module.exports = async (req, res) => {
  console.log('Rendering page for:', req.url);
  
  try {
    // FIRST: Try to render test.ejs to verify EJS works
    const testPath = path.join(__dirname, '../views/test.ejs');
    
    // Check if EJS module is available
    let ejs;
    try {
      ejs = require('ejs');
      console.log('EJS module loaded successfully');
    } catch (e) {
      console.log('EJS module NOT loaded:', e.message);
      return sendFallback(res, 'EJS module not installed');
    }
    
    // Check if test.ejs exists
    try {
      await fs.access(testPath);
      console.log('test.ejs exists at:', testPath);
    } catch (e) {
      console.log('test.ejs NOT found:', testPath);
      return sendFallback(res, 'test.ejs not found');
    }
    
    // Render the EJS file
    const html = await ejs.renderFile(testPath, {
      title: 'Test Page',
      timestamp: new Date().toISOString()
    });
    
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
    console.log('EJS rendered successfully');
    
  } catch (error) {
    console.error('Full render error:', error);
    sendFallback(res, error.message);
  }
};

function sendFallback(res, reason) {
  const html = `
    <!DOCTYPE html>
    <html>
    <body>
      <h1>Temporary View</h1>
      <p>Reason: ${reason}</p>
      <p>EJS is not working yet. Check package.json for "ejs" dependency.</p>
      <p><a href="/api">Check API</a> | <a href="/">Refresh</a></p>
    </body>
    </html>
  `;
  res.end(html);
}
