#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎨 LORE Martial Arts - Font Setup Helper\n');

// Check if fonts directory exists
const fontsDir = path.join(__dirname, 'public', 'fonts');
if (!fs.existsSync(fontsDir)) {
  console.log('📁 Creating fonts directory...');
  fs.mkdirSync(fontsDir, { recursive: true });
}

// List existing fonts
console.log('📂 Current fonts in public/fonts/:');
try {
  const fontFiles = fs.readdirSync(fontsDir);
  if (fontFiles.length === 0) {
    console.log('   No font files found');
  } else {
    fontFiles.forEach(file => {
      console.log(`   ✅ ${file}`);
    });
  }
} catch (error) {
  console.log('   Error reading fonts directory');
}

console.log('\n📋 To add custom fonts:');
console.log('1. Copy your .otf and .ttf files to public/fonts/');
console.log('2. Update src/app/globals.css with your font names');
console.log('3. Use fontFamily: "YourFontName, serif" in your components');
console.log('\n📖 See FONTS_README.md for detailed instructions');

// Check if globals.css exists and show current font setup
const globalsPath = path.join(__dirname, 'src', 'app', 'globals.css');
if (fs.existsSync(globalsPath)) {
  const content = fs.readFileSync(globalsPath, 'utf8');
  const fontFaces = content.match(/@font-face\s*{[^}]+}/g);
  
  if (fontFaces) {
    console.log('\n🔤 Current font-face declarations in globals.css:');
    fontFaces.forEach((fontFace, index) => {
      const fontName = fontFace.match(/font-family:\s*['"]([^'"]+)['"]/);
      if (fontName) {
        console.log(`   ${index + 1}. ${fontName[1]}`);
      }
    });
  }
}

console.log('\n✨ Font setup complete!');
console.log('💡 Tip: Restart your development server after adding fonts');
