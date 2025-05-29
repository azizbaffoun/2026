/**
 * Arabic Welcome Animation
 * Creates dynamic and lively animations for Arabic text "مرحباً بك"
 * Makes the text feel alive, bigger, and fills more space
 */

document.addEventListener('DOMContentLoaded', function() {
  // Find all Arabic welcome elements
  initializeArabicWelcome();
});

/**
 * Initialize the Arabic welcome animations
 */
function initializeArabicWelcome() {
  try {
    // Find all elements with the welcome text - FIXED: Don't use custom selectors that can break the page
    const arabicElements = [];
    
    // Only target elements with specific classes to avoid breaking the page
    document.querySelectorAll('.arabic-welcome, .arabic-text').forEach(el => {
      arabicElements.push(el);
    });
    
    // Find elements containing the welcome text without breaking querySelector
    document.querySelectorAll('h1, h2, h3, div').forEach(el => {
      if (el.textContent && el.textContent.includes('مرحباً بك')) {
        arabicElements.push(el);
      }
    });
    
    // Process each element found
    arabicElements.forEach(element => {
      // Only transform if not already transformed
      if (!element.closest('.arabic-welcome-container') && !element.classList.contains('arabic-welcome-container')) {
        transformArabicElement(element);
      }
    });
    
    // Look for the explicitly added welcome container in the HTML
    const existingWelcomeContainer = document.querySelector('.arabic-welcome-container');
    
    // Also look for specific elements where we want to add the welcome text
    const heroSection = document.querySelector('.hero-screen-section');
    if (heroSection && !existingWelcomeContainer && !heroSection.querySelector('.arabic-welcome-container')) {
      // Create the welcome element in the hero section
      createArabicWelcome(heroSection);
    }
  } catch (error) {
    console.error('Error initializing Arabic welcome:', error);
  }
}

/**
 * Transform an existing element with Arabic text into an animated welcome
 * @param {HTMLElement} element - The element containing Arabic text
 */
function transformArabicElement(element) {
  try {
    // Don't modify elements that are already handled
    if (element.classList.contains('arabic-welcome-container') || 
        element.closest('.arabic-welcome-container')) {
      return;
    }
    
    // Store original content
    const text = element.textContent.trim();
    
    // Create a wrapper to preserve the original element
    const wrapper = document.createElement('div');
    wrapper.className = 'arabic-welcome-container';
    wrapper.style.cssText = 'display: inline-block; position: relative; margin: 0.5em 0;';
    
    // Insert wrapper before the element
    element.parentNode.insertBefore(wrapper, element);
    
    // Create the animated content inside the wrapper
    createAnimatedContent(wrapper, text);
    
    // Remove the original element to avoid duplication
    element.parentNode.removeChild(element);
  } catch (error) {
    console.error('Error transforming element:', error);
  }
}

/**
 * Create a new Arabic welcome element in a container
 * @param {HTMLElement} container - The container to add the welcome to
 * @param {Object} options - Configuration options
 */
function createArabicWelcome(container, options = {}) {
  try {
    const welcomeContainer = document.createElement('div');
    welcomeContainer.className = 'arabic-welcome-container';
    
    // Position the container
    if (options.position === 'centered') {
      welcomeContainer.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;';
    } else {
      welcomeContainer.style.cssText = 'margin: 30px auto; text-align: center; width: 100%;';
    }
    
    // Create the welcome text
    const text = options.text || 'مرحباً بك';
    
    // Create the animated content
    createAnimatedContent(welcomeContainer, text);
    
    // Add to container
    if (options.prepend) {
      container.prepend(welcomeContainer);
    } else {
      container.appendChild(welcomeContainer);
    }
    
    return welcomeContainer;
  } catch (error) {
    console.error('Error creating welcome element:', error);
    return null;
  }
}

/**
 * Create the animated content inside a container
 * @param {HTMLElement} container - The container element
 * @param {string} text - The text to animate
 */
function createAnimatedContent(container, text) {
  try {
    // Clear existing content
    container.innerHTML = '';
    
    // Create 3D planes
    const threeDContainer = document.createElement('div');
    threeDContainer.className = 'arabic-welcome-3d';
    
    // Add 3D floating planes - limit to 2 for better performance
    for (let i = 0; i < 2; i++) {
      const plane = document.createElement('div');
      plane.className = 'arabic-welcome-plane';
      plane.style.setProperty('--rotate-x', `${60 + (i * 10)}deg`);
      plane.style.setProperty('--rotate-y', `${30 + (i * 15)}deg`);
      plane.style.setProperty('--translate-z', `${-100 - (i * 50)}px`);
      plane.style.setProperty('--delay', `${i * 0.5}s`);
      threeDContainer.appendChild(plane);
    }
    
    container.appendChild(threeDContainer);
    
    // Create glow background
    const glowElement = document.createElement('div');
    glowElement.className = 'arabic-welcome-glow';
    container.appendChild(glowElement);
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'arabic-welcome-particles';
    
    // Add particles - reduce to 8 for better performance
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'arabic-welcome-particle';
      
      // Random position
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      
      // Random movement
      particle.style.setProperty('--translate-x', `${(Math.random() * 60) - 30}px`);
      particle.style.setProperty('--translate-y', `${(Math.random() * 60) - 30}px`);
      particle.style.setProperty('--translate-end-x', `${(Math.random() * 80) - 40}px`);
      particle.style.setProperty('--translate-end-y', `${(Math.random() * 80) - 40}px`);
      
      // Random timing
      particle.style.setProperty('--duration', `${5 + (Math.random() * 5)}s`);
      particle.style.setProperty('--delay', `${Math.random() * 3}s`);
      
      particlesContainer.appendChild(particle);
    }
    
    container.appendChild(particlesContainer);
    
    // Add strokes (lines) - reduce to 3 for better performance
    for (let i = 0; i < 3; i++) {
      const stroke = document.createElement('div');
      stroke.className = 'arabic-welcome-stroke';
      
      // Set rotation and delay
      const rotation = (Math.random() * 60) - 30;
      stroke.style.setProperty('--rotation', `${rotation}deg`);
      stroke.style.setProperty('--delay', `${i * 0.7}s`);
      
      container.appendChild(stroke);
    }
    
    // Create the text with letter-by-letter animation
    const textElement = document.createElement('div');
    textElement.className = 'arabic-welcome-text';
    
    // Split text into individual characters for animation
    const letters = text.split('');
    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.className = 'arabic-letter';
      span.textContent = letter;
      span.style.setProperty('--index', index);
      span.style.setProperty('--rotation', `${(Math.random() * 4) - 2}deg`);
      textElement.appendChild(span);
    });
    
    container.appendChild(textElement);
    
    // Setup intersection observer for performance
    setupIntersectionObserver(container);
  } catch (error) {
    console.error('Error creating animated content:', error);
    // Fallback to simple text if animation fails
    container.innerHTML = `<div style="font-size: 4em; font-weight: 700; color: #fff; text-align: center; direction: rtl;">${text}</div>`;
  }
}

/**
 * Sets up an intersection observer to optimize performance
 * @param {HTMLElement} container - The container element
 */
function setupIntersectionObserver(container) {
  try {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const animatedElements = container.querySelectorAll('.arabic-welcome-text, .arabic-welcome-glow, .arabic-welcome-particle, .arabic-welcome-stroke, .arabic-welcome-plane');
        
        animatedElements.forEach(el => {
          if (entry.isIntersecting) {
            // Resume animations
            el.style.animationPlayState = 'running';
          } else {
            // Pause animations when out of view
            el.style.animationPlayState = 'paused';
          }
        });
      });
    }, {
      threshold: 0.1,
      rootMargin: '20px'
    });

    // Observe the container
    observer.observe(container);
  } catch (error) {
    console.error('Error setting up intersection observer:', error);
  }
}

// REMOVED: Custom selector functions that were breaking the page
// DO NOT override native querySelector functions 