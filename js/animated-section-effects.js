/**
 * Animated Section Effects
 * Add dynamic animated effects to any section on the site
 * Compatible with RTL layouts and responsive design
 */

class AnimatedSectionEffects {
  /**
   * Initialize the animation effects on the specified sections
   * @param {string} selector - CSS selector for target sections
   * @param {Object} options - Configuration options
   */
  constructor(selector = '.animated-section-container', options = {}) {
    this.selector = selector;
    this.options = Object.assign({
      theme: 'green',           // 'green', 'blue', 'purple', 'orange'
      animationSpeed: 'normal', // 'fast', 'normal', 'slow'
      gridDensity: 'normal',    // 'dense', 'normal', 'sparse'
      linesCount: 8,            // Number of animated lines (1-8)
      particlesCount: 8,        // Number of particles (1-8)
      glowsCount: 2,            // Number of circular glows (0-2)
      showGrid: true,           // Whether to show the grid overlay
      autoInitialize: true      // Whether to initialize automatically
    }, options);

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else if (this.options.autoInitialize) {
      this.init();
    }
  }

  /**
   * Initialize the animation effects
   */
  init() {
    // Get all target sections
    const sections = document.querySelectorAll(this.selector);
    
    if (!sections.length) {
      console.warn(`No sections found with selector: ${this.selector}`);
      return;
    }

    // Initialize each section
    sections.forEach((section, index) => {
      this.initializeSection(section, index);
    });
  }

  /**
   * Initialize a single section with animation effects
   * @param {HTMLElement} section - The section element
   * @param {number} index - Index of the section
   */
  initializeSection(section, index) {
    // Create effects container
    const effectsContainer = document.createElement('div');
    effectsContainer.className = 'section-effects-container';
    
    // Add theme class if specified
    if (this.options.theme !== 'green') {
      effectsContainer.classList.add(`${this.options.theme}-theme`);
    }
    
    // Add animation speed class if not normal
    if (this.options.animationSpeed !== 'normal') {
      effectsContainer.classList.add(`${this.options.animationSpeed}-animations`);
    }
    
    // Add grid density class if not normal
    if (this.options.gridDensity !== 'normal') {
      effectsContainer.classList.add(`${this.options.gridDensity}-grid`);
    }

    // Add to section
    section.appendChild(effectsContainer);

    // Create grid overlay if enabled
    if (this.options.showGrid) {
      this.createGridOverlay(effectsContainer);
    }

    // Create circular glows
    this.createCircularGlows(effectsContainer);

    // Create animated lines
    this.createAnimatedLines(effectsContainer);

    // Create glowing particles
    this.createGlowingParticles(effectsContainer);

    // Make visible after a short delay for smoother loading
    setTimeout(() => {
      effectsContainer.classList.add('visible');
    }, 800 + (index * 200)); // Stagger animation for multiple sections

    // Add intersection observer to optimize performance
    this.setupIntersectionObserver(effectsContainer);
  }

  /**
   * Creates the grid overlay effect
   * @param {HTMLElement} container - The container element
   */
  createGridOverlay(container) {
    if (!this.options.showGrid) return;
    
    const gridOverlay = document.createElement('div');
    gridOverlay.className = 'section-grid';
    container.appendChild(gridOverlay);
  }

  /**
   * Creates the animated diagonal lines
   * @param {HTMLElement} container - The container element
   */
  createAnimatedLines(container) {
    const count = Math.min(8, Math.max(1, this.options.linesCount));
    
    // Create animated lines
    for (let i = 0; i < count; i++) {
      const line = document.createElement('div');
      line.className = `section-animated-line line-${i + 1}`;
      container.appendChild(line);
    }
  }

  /**
   * Creates glowing particles
   * @param {HTMLElement} container - The container element
   */
  createGlowingParticles(container) {
    const count = Math.min(8, Math.max(0, this.options.particlesCount));
    
    // Create particles
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = `section-particle particle-${i + 1}`;
      container.appendChild(particle);
    }
  }

  /**
   * Creates circular glow effects
   * @param {HTMLElement} container - The container element
   */
  createCircularGlows(container) {
    const count = Math.min(2, Math.max(0, this.options.glowsCount));
    
    // Create circular glows
    for (let i = 0; i < count; i++) {
      const glow = document.createElement('div');
      glow.className = `section-circular-glow glow-${i + 1}`;
      container.appendChild(glow);
    }
  }

  /**
   * Sets up an intersection observer to optimize performance
   * Only animate when the section is in view
   * @param {HTMLElement} container - The container element
   */
  setupIntersectionObserver(container) {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When section enters viewport
        if (entry.isIntersecting) {
          // Resume animations by removing the paused class
          container.classList.remove('paused');
        } else {
          // Pause animations when out of view to save resources
          container.classList.add('paused');
        }
      });
    }, {
      threshold: 0.1, // Trigger when at least 10% of the element is visible
      rootMargin: '50px'
    });

    // Observe the container
    observer.observe(container.parentElement);
  }

  /**
   * Apply effects to a new section dynamically
   * @param {HTMLElement|string} section - The section element or selector
   * @param {Object} options - Custom options for this section
   */
  applyToSection(section, options = {}) {
    // Get the section element if a selector was provided
    const sectionElement = typeof section === 'string' 
      ? document.querySelector(section) 
      : section;
    
    if (!sectionElement) {
      console.warn(`Section not found: ${section}`);
      return;
    }
    
    // Add the animated-section-container class if it doesn't have it
    if (!sectionElement.classList.contains('animated-section-container')) {
      sectionElement.classList.add('animated-section-container');
    }
    
    // Merge options with instance options
    const sectionOptions = Object.assign({}, this.options, options);
    
    // Store original options
    const originalOptions = this.options;
    
    // Set temporary options for this section
    this.options = sectionOptions;
    
    // Initialize the section
    this.initializeSection(sectionElement, 0);
    
    // Restore original options
    this.options = originalOptions;
  }

  /**
   * Remove effects from a section
   * @param {HTMLElement|string} section - The section element or selector
   */
  removeFromSection(section) {
    // Get the section element if a selector was provided
    const sectionElement = typeof section === 'string' 
      ? document.querySelector(section) 
      : section;
    
    if (!sectionElement) {
      console.warn(`Section not found: ${section}`);
      return;
    }
    
    // Find and remove the effects container
    const effectsContainer = sectionElement.querySelector('.section-effects-container');
    if (effectsContainer) {
      effectsContainer.remove();
    }
    
    // Remove the animated-section-container class
    sectionElement.classList.remove('animated-section-container');
  }
}

// Create global instance with default options
const animatedSections = new AnimatedSectionEffects();

// Export for modular usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimatedSectionEffects;
}

/**
 * Helper function to easily apply effects to any section
 * @param {string|HTMLElement} selector - CSS selector or element
 * @param {Object} options - Configuration options
 */
function applyAnimatedEffects(selector, options = {}) {
  animatedSections.applyToSection(selector, options);
}

/**
 * Helper function to remove effects from a section
 * @param {string|HTMLElement} selector - CSS selector or element
 */
function removeAnimatedEffects(selector) {
  animatedSections.removeFromSection(selector);
} 