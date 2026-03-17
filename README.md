# 💖 Romantic Birthday Surprise Website

A beautiful, cinematic birthday website with glassmorphism UI, romantic animations, and heartfelt messages.

## ✨ Features

- **Glassmorphism Design**: Modern frosted glass cards with blur effects
- **Romantic Animations**: Floating hearts, particles, glowing text effects
- **Interactive Elements**: Clickable heart burst, typewriter effects, photo gallery
- **Background Music**: Auto-play romantic background music
- **Countdown Timer**: Live countdown to March 17, 2026
- **Multiple Sections**: 
  - Landing page with start button
  - Birthday wish with typewriter animation
  - 5-photo memory gallery with 3D effects
  - Love animation section
  - Special message card
  - Final surprise with interactive heart burst
- **Responsive Design**: Works perfectly on all devices

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your Photos

Replace the placeholder images in `birthday-surprise.jsx`:

```javascript
const IMAGES = {
  img1: '/images/img1.jpg',  // Your photo 1
  img2: '/images/img2.jpg',  // Your photo 2
  img3: '/images/img3.jpg',  // Your photo 3
  img4: '/images/img4.jpg',  // Your photo 4
  img5: '/images/img5.jpg'   // Your photo 5
};
```

**Steps:**
1. Create a `public/images` folder in your project root
2. Add your 5 photos: `img1.jpg`, `img2.jpg`, `img3.jpg`, `img4.jpg`, `img5.jpg`
3. Update the paths in the code above

### 3. Add Background Music

1. Get a romantic song (MP3 format)
2. Rename it to `love.mp3`
3. Place it in the `public` folder
4. The audio reference in the code is already set to `love.mp3`

### 4. Run the Website

```bash
npm run dev
```

Visit `http://localhost:3000` to see your romantic surprise! 🎉

## 🎨 Customization Guide

### Change Messages

Edit these variables in `birthday-surprise.jsx`:

```javascript
// Main birthday message (appears with typewriter effect)
const wishMessage = "Your custom message here...";

// Special message (appears in glass card)
const specialMessage = "Your heartfelt message...";
```

### Customize Colors

The color scheme uses:
- **Pink**: `#ff4d6d`, `#ff758f`
- **Purple**: `#8a2be2`
- **Dark Blue**: `#0f172a`

To change colors, edit the gradient classes throughout the code:
- `from-pink-500` → Change to your color
- `via-purple-500` → Change to your color
- `to-pink-900` → Change to your color

### Adjust Countdown Date

The countdown is set to **March 17, 2026**. To change:

```javascript
const birthday = new Date('2026-03-17T00:00:00');
// Change to: new Date('YYYY-MM-DDTHH:MM:SS')
```

### Section Timing

Sections auto-advance with these delays (in milliseconds):

```javascript
const delays = [0, 8000, 8000, 10000, 8000, 10000];
```

Each number represents how long that section displays before moving to the next:
- Section 1 (Birthday Wish): 8 seconds
- Section 2 (Photo Gallery): 8 seconds
- Section 3 (Love Animation): 10 seconds
- Section 4 (Special Message): 8 seconds
- Section 5 (Final Surprise): 10 seconds

Change these numbers to adjust timing!

### Typewriter Speed

```javascript
setTimeout(() => {
  setTypewriterText(wishMessage.slice(0, typewriterText.length + 1));
}, 50); // 50ms per character - lower = faster
```

## 📱 Mobile Optimization

The website is fully responsive! It automatically adjusts:
- Font sizes (using `md:text-*` classes)
- Layout (grid changes from 2 to 3 to 5 columns)
- Card sizes and spacing

## 🎁 Additional Customizations

### Add More Photos

Simply add more items to the IMAGES object and they'll automatically appear:

```javascript
const IMAGES = {
  img1: '/images/img1.jpg',
  img2: '/images/img2.jpg',
  img3: '/images/img3.jpg',
  img4: '/images/img4.jpg',
  img5: '/images/img5.jpg',
  img6: '/images/img6.jpg',  // Add more!
  img7: '/images/img7.jpg',
};
```

### Disable Auto-Advance

Comment out this useEffect to make sections manual:

```javascript
// Comment out or remove this entire block:
/*
useEffect(() => {
  if (started && section < 6) {
    const delays = [0, 8000, 8000, 10000, 8000, 10000];
    const timeout = setTimeout(() => {
      setSection(s => s + 1);
    }, delays[section]);
    return () => clearTimeout(timeout);
  }
}, [started, section]);
*/
```

### Change Animation Effects

The website uses several animation classes:
- `animate-glow` - Glowing text effect
- `animate-heartbeat` - Pulsing heart
- `animate-fadeIn` - Fade in effect
- `animate-fadeInUp` - Fade in from bottom
- `animate-pulse` - Pulsing effect
- `animate-spin-slow` - Slow rotation

You can apply these to any element!

## 🔧 Technical Details

**Built with:**
- React 18
- Vite (fast build tool)
- Tailwind CSS (styling)
- Lucide React (icons)
- Custom CSS animations

**File Structure:**
```
birthday-surprise/
├── public/
│   ├── images/          # Your 5 photos go here
│   └── love.mp3         # Background music
├── src/ (all files in root for simplicity)
├── birthday-surprise.jsx  # Main component
├── App.jsx              # App wrapper
├── main.jsx            # React entry
├── index.css           # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Vite config
└── tailwind.config.js  # Tailwind config
```

## 🌟 Pro Tips

1. **Music Format**: MP3 works best for compatibility
2. **Photo Size**: Use photos around 800-1200px wide for best quality
3. **Photo Format**: JPG or PNG both work great
4. **Testing**: Always test on mobile before sharing!
5. **Sharing**: You can deploy this to Vercel, Netlify, or GitHub Pages for free

## 🚢 Deployment

### Deploy to Vercel (Free):

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify:

```bash
npm run build
# Upload the 'dist' folder to netlify.com
```

## 💝 Final Notes

This website is designed to be a heartfelt surprise. The combination of:
- Beautiful glassmorphism design
- Romantic color palette
- Smooth animations
- Personal photos and messages
- Background music

...creates an unforgettable digital love letter!

**Important:** Make sure to:
1. ✅ Add your 5 photos
2. ✅ Add your music file (love.mp3)
3. ✅ Customize the messages
4. ✅ Test on different devices
5. ✅ Share the link on her birthday! 💖

---

Made with ❤️ for your special someone
