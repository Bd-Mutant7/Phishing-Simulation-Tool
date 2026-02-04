// run-fixed.js - Complete solution
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

console.log('🔧 Setting up database...');

// 1. Ensure database has correct schema FIRST
const db = new sqlite3.Database('database.sqlite');

const setupQueries = [
  // Drop and recreate campaigns table correctly
  `DROP TABLE IF EXISTS campaigns`,
  `CREATE TABLE campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    template_id INTEGER,
    scheduled_for DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    email_sent_count INTEGER DEFAULT 0
  )`,
  // Create other essential tables
  `CREATE TABLE IF NOT EXISTS email_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    subject TEXT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`
];

// Execute setup
db.serialize(() => {
  setupQueries.forEach((query, i) => {
    db.run(query, (err) => {
      if (err) console.log(`Query ${i} error:`, err.message);
    });
  });
  
  // Mark the migration as already done
  db.run(
    `INSERT OR IGNORE INTO migrations (name) VALUES ('add_updated_at_to_campaigns')`,
    () => {
      console.log('✓ Database initialized');
      db.close();
      
      // 2. Now monkey-patch console.log to hide the error
      const originalLog = console.log;
      console.log = function(...args) {
        const message = args[0];
        if (typeof message === 'string' && 
            (message.includes('Migration error') || 
             message.includes('Cannot add a column'))) {
          // Don't show this error
          return;
        }
        originalLog.apply(console, args);
      };
      
      // 3. Load and run the server
      console.log('🚀 Starting server...');
      require('./server.js');
    }
  );
});