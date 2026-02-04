const fs = require('fs');
const path = require('path');

function searchInFile(filePath, pattern) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      if (line.includes(pattern)) {
        console.log(`\n📁 ${filePath}:${index + 1}`);
        console.log(`   ${line.trim()}`);
        
        // Show context
        for (let i = Math.max(0, index - 2); i <= Math.min(lines.length - 1, index + 2); i++) {
          const prefix = i === index ? '>>> ' : '    ';
          console.log(`${prefix}${lines[i].trim()}`);
        }
      }
    });
  } catch (err) {
    // File might not exist or can't be read
  }
}

function searchDirectory(dir, pattern) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory() && item.name !== 'node_modules') {
      searchDirectory(fullPath, pattern);
    } else if (item.isFile() && item.name.endsWith('.js')) {
      searchInFile(fullPath, pattern);
    }
  }
}

console.log('🔍 Searching for migration-related code...\n');

// Search for these patterns
const patterns = [
  'ADD COLUMN',
  'updated_at',
  'migration',
  'Cannot add a column',
  'Checking for required migrations'
];

patterns.forEach(pattern => {
  console.log(`\n=== Searching for: "${pattern}" ===`);
  searchDirectory('.', pattern);
});