// start-fixed.js
console.log('🚀 Starting with fixed migrations...');

// First, ensure the migration is marked as done
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');

// Quick check: does campaigns table have updated_at column?
db.get("PRAGMA table_info(campaigns)", (err, columns) => {
  if (columns) {
    const hasUpdatedAt = columns.some(col => col.name === 'updated_at');
    console.log(`✓ campaigns table exists, has updated_at: ${hasUpdatedAt}`);
  }
  
  // Ensure migrations table exists with our migration marked
  db.run(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, () => {
    // Insert our migration to prevent it from running
    db.run(
      `INSERT OR IGNORE INTO migrations (name) VALUES ('add_updated_at_to_campaigns')`,
      () => {
        db.close();
        console.log('✓ Database ready, starting server...\n');
        // Now start the actual server
        require('./server.js');
      }
    );
  });
});