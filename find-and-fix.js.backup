const fs = require('fs');
const path = require('path');

console.log('🔍 Searching for migration code...\n');

// Search all JS files
function searchFiles(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && 
            !file.includes('node_modules') && 
            !file.includes('.git')) {
            searchFiles(fullPath);
        } else if (file.endsWith('.js')) {
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                
                // Look for migration patterns
                if (content.includes('Adding updated_at column to campaigns table') ||
                    content.includes('Cannot add a column with non-constant default')) {
                    
                    console.log(`\n📄 FOUND in: ${fullPath}`);
                    console.log('=' .repeat(50));
                    
                    // Show the problematic lines
                    const lines = content.split('\n');
                    lines.forEach((line, idx) => {
                        if (line.includes('updated_at') || line.includes('ADD COLUMN') || 
                            line.includes('Migration error')) {
                            console.log(`${idx + 1}: ${line.trim()}`);
                        }
                    });
                    
                    // Offer to fix it
                    console.log('\n💡 Fix this file? (y/n)');
                    // For now, let's just create a backup
                    fs.copyFileSync(fullPath, fullPath + '.backup');
                    console.log(`✓ Backup created: ${fullPath}.backup`);
                }
            } catch (err) {
                // Skip files we can't read
            }
        }
    }
}

searchFiles('.');
console.log('\n✅ Search complete.');