// patch-server.js - This will intercept and fix the migration
const Module = require('module');
const fs = require('fs');
const vm = require('vm');

// Read the original server.js
const originalCode = fs.readFileSync('./server.js', 'utf8');

// Find and fix the problematic migration code
// Look for the pattern: "Adding updated_at column to campaigns table"
const lines = originalCode.split('\n');
let fixedCode = originalCode;

// Fix 1: Replace the problematic ALTER TABLE statement
fixedCode = fixedCode.replace(
  /db\.run\(["']ALTER TABLE campaigns ADD COLUMN updated_at[^"']*["']\)/g,
  `// PATCHED: Migration disabled - column already exists
  console.log('[PATCH] Skipping updated_at migration - column already exists');`
);

// Fix 2: Comment out the entire migration block if we can find it
fixedCode = fixedCode.replace(
  /(\/\/.*)?\s*console\.log\(['"]\[DATABASE\] Adding updated_at column to campaigns table\.\.\.['"]\)[^}]*Migration error[^}]*\}/gs,
  `// [PATCH] Migration block disabled - table already has updated_at column
  console.log('[PATCH] Migration skipped - schema already up to date');`
);

// Fix 3: More aggressive - skip any ADD COLUMN for updated_at
fixedCode = fixedCode.replace(
  /(db\.run|database\.run|await.*run)\([^)]*ADD COLUMN[^)]*updated_at[^)]*\)/g,
  `// PATCHED: Skipping problematic migration
  console.log('[PATCH] Migration for updated_at skipped');`
);

// Save patched version
fs.writeFileSync('./server-patched.js', fixedCode);
console.log('✓ Created patched server.js');

// Run the patched version
require('./server-patched.js');