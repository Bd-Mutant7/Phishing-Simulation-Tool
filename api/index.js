// Simple function without Express
module.exports = async (req, res) => {
  const { url } = req;
  
  if (url === '/') {
    return res.end('Home Page');
  }
  
  if (url === '/test') {
    return res.end('Test Page');
  }
  
  if (url === '/analytics') {
    return res.end('Analytics Page');
  }
  
  res.statusCode = 404;
  res.end('Not Found: ' + url);
};
