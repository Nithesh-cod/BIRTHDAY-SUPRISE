# 🎵 HOW TO ADD MUSIC - STEP BY STEP

## ✅ EASY METHOD (Recommended):

### Step 1: Download Music from YouTube
1. Go to: **https://ytmp3.nu/** or **https://y2mate.com/**
2. Search YouTube for: "romantic love song instrumental" or "beautiful background music"
3. Copy the YouTube video URL
4. Paste it into the converter website
5. Click "Convert to MP3"
6. Download the MP3 file

### Step 2: Rename the File
- The downloaded file will have a name like "Beautiful-Music.mp3"
- **RENAME IT TO EXACTLY:** `love.mp3`
- (lowercase, no spaces, exactly "love.mp3")

### Step 3: Place the File
**IMPORTANT:** Put `love.mp3` in the `public` folder

Your folder structure should look like:
```
birthday-surprise-website/
├── public/
│   ├── love.mp3          ← PUT THE FILE HERE!
│   └── images/
│       ├── img1.jpg
│       ├── img2.jpg
│       ├── img3.jpg
│       ├── img4.jpg
│       └── img5.jpg
├── index.html
├── package.json
└── ...
```

### Step 4: Test It
1. Run: `npm run dev`
2. Open: http://localhost:3000
3. **Click ANYWHERE** on the page
4. Music should start playing! 🎵

## 🎼 RECOMMENDED SONGS TO SEARCH:

- "Beautiful Romantic Piano Music"
- "Lovely Instrumental Background Music"
- "Soft Love Song No Copyright"
- "Peaceful Romantic Music"
- "Emotional Love Song Instrumental"

## ❓ TROUBLESHOOTING:

**Music not playing?**
1. Make sure the file is named EXACTLY `love.mp3`
2. Make sure it's in the `public/` folder (not `public/images/`)
3. Click ANYWHERE on the page after it loads
4. Check browser console (F12) for error messages
5. Try a different MP3 file (some files may be corrupted)

**File format:**
- MUST be `.mp3` format
- If you have `.m4a`, `.wav`, or other formats, convert them to MP3 using online converters

## ✅ ALTERNATIVE: Use Your Own Music

If you have an MP3 file on your computer:
1. Rename it to: `love.mp3`
2. Copy it to: `birthday-surprise-website/public/love.mp3`
3. Done!

---

**NOTE:** The music will auto-play when the page loads. If the browser blocks autoplay, it will start playing when the user clicks anywhere on the page.
