/**
 * Animated Section Effects - Usage Examples
 * 
 * This file demonstrates how to use the animated-section-effects.js library
 * to apply dynamic visual effects to various sections on your site.
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // EXAMPLE 1: Apply to the hero section with default settings (green theme)
  // First, add the container class to the section
  const heroSection = document.querySelector('.hero-screen-section');
  if (heroSection) {
    heroSection.classList.add('animated-section-container');
  }
  // The default instance will automatically apply effects to all elements with the container class
  
  // EXAMPLE 2: Apply to another section with a blue theme and faster animations
  // Method 1: Using the global helper function
  applyAnimatedEffects('.benefits-section', {
    theme: 'blue',
    animationSpeed: 'fast',
    linesCount: 6,
    particlesCount: 4
  });
  
  // EXAMPLE 3: Apply to a specific element with custom options
  // Method 2: Using the class directly for more control
  const aboutSection = document.querySelector('.about-section');
  if (aboutSection) {
    // Create a custom instance with specific settings
    const aboutSectionEffects = new AnimatedSectionEffects(null, {
      theme: 'purple',
      gridDensity: 'dense',
      linesCount: 4,
      particlesCount: 6,
      glowsCount: 1,
      autoInitialize: false // Don't initialize automatically
    });
    
    // Apply to the section manually
    aboutSectionEffects.applyToSection(aboutSection);
  }
  
  // EXAMPLE 4: Apply different themes to different sections
  // This is useful for applying consistent themes across your site
  const sections = {
    '.services-section': { theme: 'orange', animationSpeed: 'slow', gridDensity: 'sparse' },
    '.testimonials-section': { theme: 'blue', linesCount: 5, particlesCount: 3 },
    '.contact-section': { theme: 'green', gridDensity: 'dense', showGrid: true }
  };
  
  // Apply effects to each section with their respective options
  Object.entries(sections).forEach(([selector, options]) => {
    const section = document.querySelector(selector);
    if (section) {
      applyAnimatedEffects(section, options);
    }
  });
  
  // EXAMPLE 5: Dynamically add effects to a section on scroll
  // This can create a nice reveal effect when scrolling
  const featuresSection = document.querySelector('.features-section');
  if (featuresSection) {
    // Only apply effects when the section comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Apply effects when the section enters the viewport
          applyAnimatedEffects(featuresSection, { 
            theme: 'purple',
            animationSpeed: 'fast'
          });
          // Stop observing after applying
          observer.unobserve(featuresSection);
        }
      });
    }, { threshold: 0.2 });
    
    // Start observing
    observer.observe(featuresSection);
  }
  
  // EXAMPLE 6: Toggle effects on button click
  const toggleButton = document.querySelector('.toggle-effects-button');
  const targetSection = document.querySelector('.toggle-section');
  
  if (toggleButton && targetSection) {
    let effectsActive = false;
    
    toggleButton.addEventListener('click', function() {
      if (effectsActive) {
        // Remove effects if active
        removeAnimatedEffects(targetSection);
        toggleButton.textContent = 'Add Effects';
        effectsActive = false;
      } else {
        // Apply effects if not active
        applyAnimatedEffects(targetSection, { 
          theme: 'blue', 
          animationSpeed: 'fast' 
        });
        toggleButton.textContent = 'Remove Effects';
        effectsActive = true;
      }
    });
  }
  
  // EXAMPLE 7: Change theme dynamically
  const themeButtons = document.querySelectorAll('.theme-selector button');
  const themeSection = document.querySelector('.theme-demo-section');
  
  if (themeButtons.length && themeSection) {
    // First, apply initial effects
    applyAnimatedEffects(themeSection, { theme: 'green' });
    
    // Set up buttons to change theme
    themeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const theme = this.getAttribute('data-theme');
        
        // Remove existing effects
        removeAnimatedEffects(themeSection);
        
        // Apply new effects with the selected theme
        applyAnimatedEffects(themeSection, { theme: theme });
      });
    });
  }
}); 