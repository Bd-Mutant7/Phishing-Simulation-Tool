// api/index.js
module.exports = (req, res) => {
  // Get the path from the request
  const path = req.url || '/';
  
  // Remove query parameters if any
  const cleanPath = path.split('?')[0];
  
  // Simple routing
  if (cleanPath === '/' || cleanPath === '') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('✅ HOME PAGE - Working!');
  }
  
  if (cleanPath === '/test') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('✅ TEST PAGE - Working!');
  }
  
  if (cleanPath === '/analytics') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('✅ ANALYTICS PAGE - Working!');
  }
  
  if (cleanPath === '/training') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('✅ TRAINING PAGE - Working!');
  }
  
  if (cleanPath === '/report') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('✅ REPORT PAGE - Working!');
  }
  
  if (cleanPath === '/user-settings') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('✅ USER SETTINGS PAGE - Working!');
  }
  
  // Not found
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('❌ Page not found: ' + cleanPath);
};
