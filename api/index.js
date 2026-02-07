// ULTRA-SIMPLE WORKING VERSION
module.exports = async (req, res) => {
  console.log('API called at:', new Date().toISOString());
  
  return res.status(200).json({
    success: true,
    message: "Phishing Simulation Tool API - Node.js 24",
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    path: req.url || '/'
  });
};
