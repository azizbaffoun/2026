# Animated Section Effects Guide

This guide explains how to use the reusable animated section effects system to add dynamic visual elements to any section on your website.

## Overview

The animated section effects system provides:
- Animated diagonal lines with gradient effects
- Glowing particles that pulse in and out
- Grid overlay background
- Circular glow effects
- Multiple color themes
- Performance optimization with intersection observers

## Quick Start

### 1. Include the CSS and JS files

Add these files to your HTML:

```html
<link href="css/animated-section-effects.css" rel="stylesheet" type="text/css">
<script src="js/animated-section-effects.js" type="text/javascript"></script>
```

### 2. Apply to sections

#### Method 1: Class-based approach
Add the `animated-section-container` class to any section you want to animate:

```html
<section class="my-section animated-section-container">
  <!-- Section content -->
</section>
```

#### Method 2: JavaScript approach
Use the `applyAnimatedEffects()` helper function:

```javascript
// Apply to a section with selector
applyAnimatedEffects('.my-section', {
  theme: 'blue',
  animationSpeed: 'fast'
});

// Apply to a specific element
const section = document.querySelector('.my-section');
applyAnimatedEffects(section, options);
```

## Customization Options

### Available Themes
- `green` (default)
- `blue`
- `purple`
- `orange`

### Animation Speed
- `normal` (default)
- `fast`
- `slow`

### Grid Density
- `normal` (default)
- `dense`
- `sparse`

### Other Options
- `linesCount`: Number of animated lines (1-8, default: 8)
- `particlesCount`: Number of particles (0-8, default: 8)
- `glowsCount`: Number of circular glows (0-2, default: 2)
- `showGrid`: Whether to show the grid overlay (default: true)

## Examples

### Basic Usage
```javascript
// Apply default effects (green theme)
applyAnimatedEffects('.my-section');
```

### Custom Theme
```javascript
// Apply blue theme with faster animations
applyAnimatedEffects('.my-section', {
  theme: 'blue',
  animationSpeed: 'fast'
});
```

### Complex Configuration
```javascript
// Apply purple theme with dense grid and fewer lines
applyAnimatedEffects('.my-section', {
  theme: 'purple',
  gridDensity: 'dense',
  linesCount: 4,
  particlesCount: 6,
  glowsCount: 1
});
```

### Remove Effects
```javascript
// Remove effects from a section
removeAnimatedEffects('.my-section');
```

## Advanced Usage

### Create Custom Instance
```javascript
// Create custom instance with specific settings
const myEffects = new AnimatedSectionEffects(null, {
  theme: 'orange',
  autoInitialize: false
});

// Apply to sections manually
myEffects.applyToSection('.section-1');
myEffects.applyToSection('.section-2', { theme: 'blue' });
```

### Apply Effects on Scroll
```javascript
// Apply effects when section comes into view
const section = document.querySelector('.my-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      applyAnimatedEffects(section, { theme: 'blue' });
      observer.unobserve(section);
    }
  });
}, { threshold: 0.2 });

observer.observe(section);
```

### Dynamic Theme Switching
```javascript
// Toggle between themes
document.querySelector('#theme-toggle').addEventListener('click', function() {
  // Remove current effects
  removeAnimatedEffects('.my-section');
  
  // Apply new theme
  applyAnimatedEffects('.my-section', { 
    theme: this.dataset.theme 
  });
});
```

## Performance Considerations

- The system automatically pauses animations when sections are not in the viewport
- For very large pages with many animated sections, consider using fewer effects or applying them only to key sections
- For mobile devices, the system automatically reduces animation complexity

## RTL Support

The animations are fully compatible with RTL layouts and will adjust automatically.

## Accessibility

The system respects the user's `prefers-reduced-motion` setting and will disable animations for users who have this preference enabled. 