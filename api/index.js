<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Phishing Simulation Tool</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: Arial, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            max-width: 800px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
        }
        h1 { 
            font-size: 2.5rem; 
            margin-bottom: 20px;
            color: white;
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            background: white;
            color: #667eea;
            padding: 12px 30px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: bold;
            margin: 10px;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .links {
            margin-top: 30px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
        }
        .timestamp {
            margin-top: 30px;
            font-size: 0.9rem;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔐 Phishing Simulation Tool</h1>
        <p>Welcome to your phishing simulation and security awareness training platform.</p>
        <p>This tool helps organizations test and improve their security posture against phishing attacks.</p>
        
        <div class="links">
            <a href="/login" class="btn">🚪 Login</a>
            <a href="/api" class="btn">🔧 API Status</a>
            <a href="/dashboard" class="btn">📊 Dashboard</a>
            <a href="https://github.com/Bd-Mutant7/Phishing-Simulation-Tool" class="btn">💻 GitHub</a>
        </div>
        
        <div class="timestamp">
            <p>Page loaded: <%= timestamp %></p>
            <p>Node.js: <%= process.version %></p>
            <p>Environment: <%= process.env.NODE_ENV || 'production' %></p>
        </div>
    </div>
</body>
</html>
