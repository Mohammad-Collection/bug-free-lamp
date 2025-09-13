# Shopify 3D Reveal Image Theme

A modern Shopify theme that transforms static images into interactive 5-second videos with stunning 3D effects.

## Features

🎬 **Reveal Image to Video**: Click or hover on images to reveal 5-second videos  
🌟 **3D Flip Animations**: Smooth 3D transformations with CSS3D  
⏱️ **Automatic Timing**: Videos automatically play for exactly 5 seconds  
📱 **Responsive Design**: Works perfectly on all devices  
🎨 **Customizable**: Easy to customize colors, animations, and behavior  
⚡ **Performance Optimized**: Lazy loading and efficient resource management  

## Implementation

This theme includes:

- **Section**: `sections/reveal-image-3d.liquid` - Complete section with admin controls
- **Snippet**: `snippets/reveal-image-3d.liquid` - Reusable component
- **Styles**: `assets/reveal-image-3d.css` - 3D animations and transitions
- **JavaScript**: `assets/reveal-image-3d.js` - Interactive functionality
- **Demo Template**: `templates/page.reveal-demo.liquid` - Demo page template

## Usage

### As a Section
Add the "Reveal Image 3D" section to any page in the Shopify admin:
1. Go to Online Store > Themes > Customize
2. Add section "Reveal Image 3D"
3. Upload your image and video
4. Configure title and description

### As a Snippet
Use the snippet in any template:
```liquid
{% render 'reveal-image-3d', image: product.featured_image, video: product.metafields.custom.reveal_video %}
```

### Custom Implementation
```liquid
<div class="reveal-image-container">
  <div class="reveal-image-wrapper">
    <img class="reveal-image" src="{{ image | image_url: width: 800 }}" alt="{{ image.alt }}">
    <video class="reveal-video" muted playsinline>
      <source src="{{ video | file_url }}" type="video/mp4">
    </video>
  </div>
  <div class="interaction-hint">
    <span>✨ Click to reveal</span>
  </div>
</div>
```

## Technical Details

- **3D Effects**: Uses CSS3D transforms and perspective
- **Video Duration**: Automatically limited to 5 seconds
- **Interaction**: Supports both click and hover triggers
- **Loading States**: Smooth loading animations
- **Error Handling**: Graceful fallbacks for unsupported browsers
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Browser Support

- Chrome 36+
- Firefox 31+
- Safari 9+
- Edge 12+
- Mobile browsers with CSS3D support

## Performance

- Videos are preloaded when in viewport
- Intersection Observer for efficient loading
- Optimized animations with GPU acceleration
- Minimal JavaScript footprint

---

**Created for Mohammad Collection**  
Version 1.0.0 
