/**
 * Section Fixer - Resolves display issues with sections and fixes welcome text
 */
document.addEventListener('DOMContentLoaded', function() {
  // Fix section display issues
  fixSectionDisplay();
  
  // Add welcome text to appropriate sections
  addWelcomeText();
});

/**
 * Fix issues with section display
 */
function fixSectionDisplay() {
  // Fix for home3-banner-section
  const homeBannerSection = document.querySelector('.home3-banner-section');
  if (homeBannerSection) {
    homeBannerSection.style.display = 'block';
    homeBannerSection.style.visibility = 'visible';
    homeBannerSection.style.opacity = '1';
    
    // Fix triangle display
    const leftTriangle = homeBannerSection.querySelector('.home-3-left-triangle');
    const rightTriangle = homeBannerSection.querySelector('.home-3-right-triangle');
    
    if (leftTriangle) {
      leftTriangle.style.display = 'block';
      leftTriangle.style.opacity = '1';
    }
    
    if (rightTriangle) {
      rightTriangle.style.display = 'block';
      rightTriangle.style.opacity = '1';
    }
  }
  
  // Fix for hero section
  const heroSection = document.querySelector('.hero-screen-section');
  if (heroSection) {
    heroSection.style.display = 'block';
    heroSection.style.visibility = 'visible';
    heroSection.style.opacity = '1';
    
    // Ensure welcome container is visible
    const welcomeContainer = heroSection.querySelector('.arabic-welcome-container');
    if (welcomeContainer) {
      welcomeContainer.style.display = 'block';
      welcomeContainer.style.visibility = 'visible';
      welcomeContainer.style.opacity = '1';
    }
  }
  
  // Fix lineup section
  const lineupSection = document.querySelector('.home-1-lineup-section');
  if (lineupSection) {
    lineupSection.style.display = 'block';
    lineupSection.style.visibility = 'visible';
    lineupSection.style.opacity = '1';
  }
  
  // Fix other sections that might be hidden
  document.querySelectorAll('section').forEach(section => {
    // Only fix if it has no display style or is set to none
    if (!section.style.display || section.style.display === 'none') {
      section.style.display = 'block';
      section.style.visibility = 'visible';
      section.style.opacity = '1';
    }
  });
}

/**
 * Add welcome text to hero section
 */
function addWelcomeText() {
  // Check if welcome text already exists
  const existingWelcome = document.querySelector('.arabic-welcome-container');
  if (existingWelcome) {
    return;
  }
  
  // Try to find the hero section
  const heroSection = document.querySelector('.hero-screen-section');
  const homeBannerSection = document.querySelector('.home3-banner-section');
  
  // Target section to add welcome text to
  const targetSection = homeBannerSection || heroSection;
  
  if (targetSection) {
    // Create welcome container
    const welcomeContainer = document.createElement('div');
    welcomeContainer.className = 'arabic-welcome-container';
    welcomeContainer.style.cssText = 'display: block; visibility: visible; opacity: 1; margin: 1em auto; text-align: center; width: 100%; position: relative; z-index: 5;';
    
    // Create welcome text
    const welcomeText = document.createElement('div');
    welcomeText.className = 'arabic-welcome-text';
    welcomeText.textContent = 'مرحباً بك';
    welcomeText.style.cssText = 'font-size: 3.5rem; font-weight: bold; color: #fff; text-shadow: 0 0 15px rgba(88, 187, 79, 0.8); direction: rtl;';
    
    // Add text to container
    welcomeContainer.appendChild(welcomeText);
    
    // Find where to insert
    const headingWrapper = targetSection.querySelector('.banner-heading-wrapper, .home-3-banner-text-wrapper');
    
    if (headingWrapper) {
      // Insert before heading wrapper
      headingWrapper.parentNode.insertBefore(welcomeContainer, headingWrapper);
    } else {
      // Fallback: insert at beginning of section
      const container = targetSection.querySelector('.w-container, .full-width-container');
      if (container) {
        container.insertBefore(welcomeContainer, container.firstChild);
      } else {
        targetSection.insertBefore(welcomeContainer, targetSection.firstChild);
      }
    }
    
    // Create simple animation for welcome text
    createWelcomeAnimation(welcomeText);
  }
}

/**
 * Create simple animation for welcome text
 */
function createWelcomeAnimation(element) {
  if (!element) return;
  
  // Create animation without relying on complex effects
  element.style.transition = 'all 0.5s ease-in-out';
  
  // Simple pulse animation
  let scale = 1;
  let increasing = true;
  
  setInterval(() => {
    if (increasing) {
      scale += 0.01;
      if (scale >= 1.05) increasing = false;
    } else {
      scale -= 0.01;
      if (scale <= 1) increasing = true;
    }
    
    element.style.transform = `scale(${scale})`;
    element.style.textShadow = `0 0 ${10 + scale * 5}px rgba(88, 187, 79, ${0.5 + scale * 0.2})`;
  }, 100);
} 