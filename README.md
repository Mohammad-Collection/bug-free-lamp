# Bug Free Lamp - Shopify Theme

A modern Shopify theme featuring 3D video reveal effects and interactive video banners.

## Features

### 🎥 Reveal Image Section
- Interactive image that transforms into a 5-second 3D video
- Supports hover or click triggers
- Configurable video duration (1-10 seconds, default 5)
- Smooth 3D animations and transitions
- Mobile responsive design

### 📺 Video Banner Section  
- Full-featured video banner with 5-second 3D videos
- Custom video controls with progress bar
- Autoplay and loop options
- Overlay content support
- Call-to-action buttons
- Advanced 3D floating effects

## Usage

### Setting Up Reveal Image
1. Add the "Reveal Image" section to your template
2. Upload a static image in the section settings
3. Add a 5-second MP4 video URL
4. Configure trigger type (hover/click)
5. Customize overlay text and duration

### Setting Up Video Banner
1. Add the "Video Banner" section to your template  
2. Upload a 5-second MP4 video URL
3. Set poster image (optional)
4. Configure autoplay, loop, and controls
5. Add overlay content and CTA button

## File Structure

```
├── assets/
│   ├── reveal-image.css     # Reveal image styles
│   ├── reveal-image.js      # Reveal image functionality
│   ├── video-banner.css     # Video banner styles
│   ├── video-banner.js      # Video banner functionality
│   ├── theme.css           # Base theme styles
│   └── theme.js            # Base theme scripts
├── config/
│   └── settings_schema.json # Theme configuration
├── layout/
│   └── theme.liquid        # Main layout template
├── sections/
│   ├── reveal-image.liquid # Reveal image section
│   ├── video-banner.liquid # Video banner section
│   ├── header.liquid       # Header section
│   └── footer.liquid       # Footer section
└── templates/
    ├── index.liquid        # Homepage template
    └── product.liquid      # Product page template
```

## Technical Features

- **3D Transformations**: Advanced CSS3 and JavaScript animations
- **Video Duration Enforcement**: Automatically limits videos to specified duration
- **Progressive Enhancement**: Works without JavaScript with graceful degradation
- **Mobile Optimized**: Responsive design for all screen sizes
- **Performance Optimized**: Lazy loading and efficient video handling
- **Accessibility**: ARIA labels and keyboard navigation support

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Mobile browsers with video support

## Installation

1. Upload theme files to your Shopify store
2. Add sections to your templates using the theme editor
3. Configure video URLs and settings
4. Test on different devices and browsers

## Video Requirements

- **Format**: MP4 (H.264 codec recommended)
- **Duration**: 5 seconds maximum (enforced by JavaScript)
- **Resolution**: 1920x1080 or smaller for optimal performance
- **File Size**: Under 10MB recommended for fast loading

## Customization

The theme uses CSS custom properties and can be easily customized:

- Colors via `settings_schema.json`
- Animations via CSS transitions
- 3D effects via transform properties
- Video controls via JavaScript classes 
