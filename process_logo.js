const Jimp = require('jimp');
const path = require('path');

async function processLogo() {
  try {
    const inputPath = path.join(__dirname, 'public', 'logoo.png');
    const outputPath = path.join(__dirname, 'public', 'logoo_transparent.png');

    // Read the image
    const image = await Jimp.read(inputPath);
    
    // Find the center and radius (assuming it's a circle in the center)
    const width = 1111; // We will determine from image
    const height = 1111; 

    // Find the actual width and height
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    
    // Create a new transparent image
    const newImage = new Jimp(w, h, 0x00000000); // Fully transparent
    
    const centerX = w / 2;
    const centerY = h / 2;
    // slightly smaller than min size to clip nicely
    const radius = Math.min(w, h) / 2 * 0.98;

    // Go through each pixel
    image.scan(0, 0, w, h, function(x, y, idx) {
      // Calculate distance from center
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      
      // If inside the circle
      if (distance <= radius) {
        // Check if the pixel is white-ish
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        const a = this.bitmap.data[idx + 3];

        // If it is very close to white, we can make it transparent
        // But the user said "remove the white background as well please"
        // Let's just make pure white transparent
        if (r > 240 && g > 240 && b > 240) {
          // It's white background inside the circle or just the background
          newImage.setPixelColor(0x00000000, x, y);
        } else {
          // Keep original pixel
          newImage.setPixelColor(Jimp.rgbaToInt(r, g, b, a), x, y);
        }
      } else {
        // Outside the circle, make it transparent
        newImage.setPixelColor(0x00000000, x, y);
      }
    });

    // Write the output
    await newImage.writeAsync(outputPath);
    console.log('Logo processed successfully!');
    
  } catch (error) {
    console.error('Error processing logo:', error);
  }
}

processLogo();
