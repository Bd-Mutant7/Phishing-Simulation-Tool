// api/render.js - UPDATED VERSION WITH PROPER ROUTING
const path = require('path');
const ejs = require('ejs');
const fs = require('fs').promises;

module.exports = async (req, res) => {
  console.log('Request for:', req.url);
  
  try {
    // Determine which page to show based on URL
    let ejsFile = 'index.ejs';
    
    // Route mapping - Add all your routes here
    if (req.url === '/login' || req.url === '/login/') {
      ejsFile = 'login.ejs';
    } else if (req.url === '/dashboard' || req.url === '/dashboard/') {
      ejsFile = 'dashboard.ejs';
    } else if (req.url === '/admin' || req.url === '/admin/') {
      ejsFile = 'admin/dashboard.ejs';
    } else if (req.url === '/admin/campaigns' || req.url === '/admin/campaigns/') {
      ejsFile = 'admin/campaigns.ejs';
    } else if (req.url === '/admin/campaign-new' || req.url === '/admin/campaign-new/') {
      ejsFile = 'admin/campaign-new.ejs';
    } else if (req.url === '/admin/campaign-detail' || req.url === '/admin/campaign-detail/') {
      ejsFile = 'admin/campaign-detail.ejs';
    } else if (req.url === '/admin/employees' || req.url === '/admin/employees/') {
      ejsFile = 'admin/employees.ejs';
    } else if (req.url === '/simulation' || req.url === '/simulation/') {
      ejsFile = 'simulation/landing.ejs';
    } else if (req.url === '/training' || req.url === '/training/') {
      ejsFile = 'training/landing.ejs';
    } else if (req.url === '/test' || req.url === '/test/') {
      ejsFile = 'test.ejs';
    }
    // Add more routes as needed
    
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
      console.log(`EJS file ${ejsFile} not found, trying index.ejs as fallback`);
      // Try index.ejs as fallback
      const fallbackPaths = [
        path.join(__dirname, '../views', 'index.ejs'),
        path.join(process.cwd(), 'views', 'index.ejs'),
        path.join('/var/task/views', 'index.ejs')
      ];
      
      for (const tryPath of fallbackPaths) {
        try {
          await fs.access(tryPath);
          ejsPath = tryPath;
          fileExists = true;
          ejsFile = 'index.ejs';
          console.log('Using fallback index.ejs at:', tryPath);
          break;
        } catch {
          continue;
        }
      }
    }
    
    if (!fileExists) {
      console.log('No EJS files found, showing fallback');
      return showFallback(res, `File ${ejsFile} not found in views/ folder`);
    }
    
    // Prepare data to pass to EJS template
    const templateData = {
      title: getPageTitle(ejsFile),
      page: ejsFile.replace('.ejs', ''),
      timestamp: new Date().toISOString(),
      currentUrl: req.url,
      user: null, // You can add user session data here later
      // Add any other data your templates need
    };
    
    // Special data for specific pages
    if (ejsFile === 'dashboard.ejs') {
      templateData.stats = {
        activeCampaigns: 5,
        completedCampaigns: 12,
        clickRate: '87%',
        totalEmployees: 150,
        trainedThisMonth: 45
      };
    }
    
    // Render the EJS file
    const html = await ejs.renderFile(ejsPath, templateData);
    
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
    
  } catch (error) {
    console.error('Render error:', error);
    showFallback(res, error.message);
  }
};

// Helper function to get page titles
function getPageTitle(ejsFile) {
  const titles = {
    'index.ejs': 'Phishing Simulation Tool',
    'login.ejs': 'Login - Phishing Simulation Tool',
    'dashboard.ejs': 'Dashboard - Phishing Simulation Tool',
    'admin/dashboard.ejs': 'Admin Dashboard',
    'admin/campaigns.ejs': 'Campaign Management',
    'admin/campaign-new.ejs': 'New Campaign',
    'admin/campaign-detail.ejs': 'Campaign Details',
    'admin/employees.ejs': 'Employee Management',
    'simulation/landing.ejs': 'Simulation Portal',
    'training/landing.ejs': 'Training Portal',
    'test.ejs': 'Test Page'
  };
  
  return titles[ejsFile] || 'Phishing Simulation Tool';
}

function showFallback(res, errorMessage) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Phishing Simulation Tool</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          padding: 40px;
          background: #f5f5f5;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .error { 
          color: #d00; 
          background: #fee; 
          padding: 15px; 
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .links { 
          margin-top: 30px;
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }
        .btn {
          display: inline-block;
          background: #0066cc;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
        }
        .btn:hover {
          background: #0055aa;
        }
        code {
          background: #f0f0f0;
          padding: 2px 5px;
          border-radius: 3px;
          font-family: monospace;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Phishing Simulation Tool</h1>
        <div class="error">
          <strong>Setup Notice:</strong> ${errorMessage}
        </div>
        <p>Your EJS files need to be in the <code>views/</code> folder.</p>
        <p>Check that the file exists in the correct location on GitHub.</p>
        
        <div class="links">
          <a href="/" class="btn">🏠 Home</a>
          <a href="/api" class="btn">🔧 API Status</a>
          <a href="/login" class="btn">🔐 Login</a>
          <a href="/dashboard" class="btn">📊 Dashboard</a>
          <a href="/test" class="btn">🧪 Test Page</a>
          <a href="https://github.com/Bd-Mutant7/Phishing-Simulation-Tool" class="btn">💻 GitHub Repo</a>
        </div>
        
        <p style="margin-top: 30px; color: #666;">
          Timestamp: ${new Date().toISOString()}
        </p>
      </div>
    </body>
    </html>
  `;
  
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
}
