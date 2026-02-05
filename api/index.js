// api/index.js
module.exports = (req, res) => {
  // Get the path from the request
  const path = req.url || '/';
  
  // Simple routing
  if (path === '/' || path === '') {
    res.statusCode = 200;
    return res.end('✅ HOME PAGE - Working!');
  }
  
  if (path === '/test') {
    res.statusCode = 200;
    return res.end('✅ TEST PAGE - Working!');
  }
  
  if (path === '/analytics') {
    res.statusCode = 200;
    return res.end('✅ ANALYTICS PAGE - Working!');
  }
  
  if (path === '/training') {
    res.statusCode = 200;
    return res.end('✅ TRAINING PAGE - Working!');
  }
  
  // Not found
  res.statusCode = 404;
  res.end('❌ Page not found: ' + path);
};
