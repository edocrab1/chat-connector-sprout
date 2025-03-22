
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

// Build the project
console.log('Building the extension...');
execSync('npm run build', { stdio: 'inherit' });

// Generate icons of different sizes from the SVG
console.log('Generating icons...');
const sizes = [16, 48, 128];
const svgPath = path.resolve(__dirname, '../assets/icon.svg');
const distPath = path.resolve(__dirname, '../../dist');

if (!fs.existsSync(svgPath)) {
  console.error('SVG icon not found at', svgPath);
  process.exit(1);
}

// Try to create icons from the SVG
try {
  sizes.forEach(size => {
    sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(path.join(distPath, `icon${size}.png`), (err) => {
        if (err) {
          console.error(`Error creating icon${size}.png:`, err);
        } else {
          console.log(`Created icon${size}.png`);
        }
      });
  });
} catch (error) {
  console.error('Error processing SVG:', error);
  
  // Fallback: If sharp fails, we'll just create empty placeholder files
  console.log('Creating placeholder icon files...');
  sizes.forEach(size => {
    try {
      // Create an empty file as a placeholder
      const iconPath = path.join(distPath, `icon${size}.png`);
      fs.writeFileSync(iconPath, '');
      console.log(`Created placeholder for icon${size}.png`);
    } catch (e) {
      console.error(`Failed to create placeholder for icon${size}.png:`, e);
    }
  });
}

console.log('Extension build complete! The extension is in the dist/ folder.');
console.log('To load the extension in Chrome:');
console.log('1. Go to chrome://extensions/');
console.log('2. Enable "Developer mode"');
console.log('3. Click "Load unpacked" and select the dist/ folder');
