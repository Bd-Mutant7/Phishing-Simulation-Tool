const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

console.log('=== Fixing Database Schema ===\n');

// Backup existing database
if (fs.existsSync('database.sqlite')) {
  fs.copyFileSync('database.sqlite', 'database.sqlite.backup');
  console.log('✓ Backup created: database.sqlite.backup');
}

const db = new sqlite3.Database('database.sqlite');

// Execute fix in serial
db.serialize(() => {
  console.log('1. Creating fresh campaigns table...');
  
  // Drop existing campaigns table
  db.run('DROP TABLE IF EXISTS campaigns');
  
  // Create new campaigns table with proper schema
  db.run(`
    CREATE TABLE campaigns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      template_id INTEGER,
      scheduled_for DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      email_sent_count INTEGER DEFAULT 0,
      FOREIGN KEY (template_id) REFERENCES email_templates(id)
    )
  `);
  
  console.log('2. Creating migrations table...');
  db.run(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Mark initial migrations as completed
  console.log('3. Marking migrations as completed...');
  const initialMigrations = [
    'create_campaigns_table',
    'add_updated_at_to_campaigns',
    'add_email_sent_count_to_campaigns'
  ];
  
  const stmt = db.prepare('INSERT OR IGNORE INTO migrations (name) VALUES (?)');
  initialMigrations.forEach(migration => {
    stmt.run(migration);
  });
  stmt.finalize();
  
  console.log('\n✓ Database schema fixed successfully!');
});

db.close();