const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');

console.log('Patching database to skip migration...');

// Create migrations table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, () => {
  // Mark the problematic migration as already done
  db.run(
    `INSERT OR IGNORE INTO migrations (name) VALUES ('add_updated_at_column_to_campaigns')`,
    (err) => {
      if (err) {
        console.log('Error:', err.message);
      } else {
        console.log('✓ Migration marked as completed');
      }
      db.close();
    }
  );
});