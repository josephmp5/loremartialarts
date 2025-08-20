# Custom Fonts Setup Guide

## How to Add Custom Fonts

### 1. Font File Requirements
- Supported formats: `.otf` (OpenType) and `.ttf` (TrueType)
- Place your font files in the `public/fonts/` directory

### 2. Upload Your Fonts
1. Copy your `.otf` and `.ttf` font files
2. Paste them into the `public/fonts/` folder
3. Rename them to something descriptive (e.g., `martial-arts-font.otf`)

### 3. Update CSS Font Declarations
Edit `src/app/globals.css` and replace the placeholder font declarations:

```css
@font-face {
  font-family: 'YourFontName'; /* Choose a name for your font */
  src: url('/fonts/your-font.otf') format('opentype'),
       url('/fonts/your-font.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

### 4. Use Your Custom Font
In your components, you can now use the custom font:

```tsx
// Option 1: Using CSS class
<div className="font-custom1">Your text here</div>

// Option 2: Using inline styles
<div style={{ fontFamily: 'YourFontName, serif' }}>Your text here</div>

// Option 3: Update existing font-family in the page.tsx
fontFamily: 'YourFontName, Chakra Petch, Crimson Text, serif'
```

### 5. Example Font Setup
If you have a font called "MartialArtsFont":

1. **File structure:**
   ```
   public/fonts/
   ├── martial-arts-font.otf
   └── martial-arts-font.ttf
   ```

2. **CSS declaration:**
   ```css
   @font-face {
     font-family: 'MartialArtsFont';
     src: url('/fonts/martial-arts-font.otf') format('opentype'),
          url('/fonts/martial-arts-font.ttf') format('truetype');
     font-weight: normal;
     font-style: normal;
     font-display: swap;
   }
   ```

3. **Usage:**
   ```tsx
   <h1 style={{ fontFamily: 'MartialArtsFont, serif' }}>LORE</h1>
   ```

### 6. Font Optimization Tips
- Use `font-display: swap` for better performance
- Provide both `.otf` and `.ttf` formats for better browser compatibility
- Consider font file sizes - compress if possible
- Test on different devices and browsers

### 7. Troubleshooting
- **Font not loading?** Check the file path in CSS
- **Font not displaying?** Ensure the font-family name matches exactly
- **Performance issues?** Consider using `font-display: optional` for non-critical fonts

## Current Font Setup
The project currently uses these fonts as fallbacks:
- Chakra Petch
- Crimson Text
- Noto Serif JP
- Serif (system default)

Your custom fonts will be loaded first, with these as fallbacks.
