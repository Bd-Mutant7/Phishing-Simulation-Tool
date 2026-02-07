// SIMPLE WORKING API - NO EJS, NO ERRORS
module.exports = async (req, res) => {
  console.log('API called:', req.method, req.url);
  
  res.setHeader('Content-Type', 'application/json');
  
  const response = {
    success: true,
    message: "Phishing Simulation Tool API",
    timestamp: new Date().toISOString(),
    path: req.url || '/',
    method: req.method || 'GET',
    status: "online"
  };
  
  res.status(200).json(response);
};
