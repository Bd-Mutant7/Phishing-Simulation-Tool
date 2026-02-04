const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');

console.log('=== Checking Database Schema ===\n');

// Check campaigns table structure
db.all("PRAGMA table_info(campaigns)", (err, rows) => {
  if (err) {
    console.log('No campaigns table exists yet');
  } else {
    console.log('Current campaigns table columns:');
    rows.forEach(col => {
      console.log(`  ${col.cid}: ${col.name} (${col.type}) ${col.notnull ? 'NOT NULL' : ''} ${col.dflt_value ? `DEFAULT ${col.dflt_value}` : ''}`);
    });
  }
  
  // Check what migrations have been run
  db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    console.log('\n=== All Tables ===');
    tables.forEach(t => console.log(`  - ${t.name}`));
    
    // Look for migrations table
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%migration%'", (err, result) => {
      if (result) {
        db.all(`SELECT * FROM ${result.name}`, (err, migrations) => {
          console.log('\n=== Applied Migrations ===');
          migrations.forEach(m => console.log(`  - ${m.name || JSON.stringify(m)}`));
          db.close();
        });
      } else {
        console.log('\nNo migrations table found');
        db.close();
      }
    });
  });
});