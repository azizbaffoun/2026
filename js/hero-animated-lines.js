/**
 * Hero Section Animated Lines Effect
 * Creates dynamic animated green lines for the hero section
 * Compatible with RTL layouts and responsive design
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if the hero section exists
  const heroSection = document.querySelector('.hero-screen-section');
  if (!heroSection) return;

  // Create and inject the animated lines container
  initializeHeroLines(heroSection);
});

/**
 * Initializes the hero animated lines effect
 * @param {HTMLElement} heroSection - The hero section element
 */
function initializeHeroLines(heroSection) {
  // Create container for animated elements
  const linesContainer = document.createElement('div');
  linesContainer.className = 'hero-lines-container';
  heroSection.appendChild(linesContainer);

  // Create grid overlay
  const gridOverlay = document.createElement('div');
  gridOverlay.className = 'hero-grid';
  linesContainer.appendChild(gridOverlay);

  // Create circular glows
  createCircularGlows(linesContainer);

  // Create animated lines
  createAnimatedLines(linesContainer);

  // Create glowing particles
  createGlowingParticles(linesContainer);

  // Make visible after a short delay (for smoother page load)
  setTimeout(() => {
    linesContainer.classList.add('visible');
  }, 800);

  // Add intersection observer to optimize performance
  setupIntersectionObserver(linesContainer);
}

/**
 * Creates the animated diagonal lines
 * @param {HTMLElement} container - The container element
 */
function createAnimatedLines(container) {
  // Create 8 animated lines
  for (let i = 0; i < 8; i++) {
    const line = document.createElement('div');
    line.className = 'animated-line';
    // Set custom rotation for each line using CSS variables if needed
    // line.style.setProperty('--rotation', `${20 - (i * 5)}deg`);
    container.appendChild(line);
  }
}

/**
 * Creates glowing particles at line intersections
 * @param {HTMLElement} container - The container element
 */
function createGlowingParticles(container) {
  // Create 8 glowing particles
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    container.appendChild(particle);
  }
}

/**
 * Creates circular glow effects
 * @param {HTMLElement} container - The container element
 */
function createCircularGlows(container) {
  // Create 2 circular glows
  for (let i = 0; i < 2; i++) {
    const glow = document.createElement('div');
    glow.className = 'circular-glow';
    container.appendChild(glow);
  }
}

/**
 * Sets up an intersection observer to optimize performance
 * Only animate when the hero section is in view
 * @param {HTMLElement} container - The container element
 */
function setupIntersectionObserver(container) {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When hero section enters viewport
      if (entry.isIntersecting) {
        // Resume animations by removing the paused class
        container.classList.remove('paused');
      } else {
        // Pause animations when out of view to save resources
        container.classList.add('paused');
      }
    });
  }, {
    threshold: 0.1 // Trigger when at least 10% of the element is visible
  });

  // Observe the container
  observer.observe(container.parentElement);
}

/**
 * Helper function to check if user prefers reduced motion
 * @returns {boolean} - True if user prefers reduced motion
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Handle resize events to adjust line positions if needed
window.addEventListener('resize', debounce(() => {
  const linesContainer = document.querySelector('.hero-lines-container');
  if (!linesContainer) return;
  
  // You could adjust line positions here if needed for different screen sizes
}, 250));

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce wait time in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
} 