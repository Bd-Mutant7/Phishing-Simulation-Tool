// api/index.js - SIMPLE WORKING VERSION
module.exports = async (req, res) => {
  console.log('API Request:', req.method, req.url);
  
  // Always set headers first
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache');
  
  // Simple response
  const response = {
    success: true,
    service: 'Phishing Simulation API',
    version: '2.0',
    timestamp: new Date().toISOString(),
    endpoint: req.url || '/',
    method: req.method || 'GET',
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'production'
  };
  
  // Send response
  res.status(200).json(response);
  
  console.log('API Response sent:', response.timestamp);
};
