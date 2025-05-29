/**
 * Home3 Banner Fix - Specifically adds welcome text to home3-banner-section
 * and ensures all elements display properly
 */
document.addEventListener('DOMContentLoaded', function() {
  // Fix the home3-banner-section
  fixHome3BannerSection();
});

/**
 * Fixes the home3-banner-section display issues and adds welcome text
 */
function fixHome3BannerSection() {
  // Find the home3-banner-section
  const bannerSection = document.querySelector('.home3-banner-section');
  
  if (!bannerSection) {
    console.log('home3-banner-section not found, creating it...');
    createHome3BannerSection();
    return;
  }
  
  // Force the section to be visible
  bannerSection.style.display = 'block';
  bannerSection.style.visibility = 'visible';
  bannerSection.style.opacity = '1';
  
  // Ensure all child elements are visible
  const allElements = bannerSection.querySelectorAll('*');
  allElements.forEach(element => {
    if (element.style.display === 'none') {
      element.style.display = 'block';
    }
    
    if (element.style.visibility === 'hidden') {
      element.style.visibility = 'visible';
    }
    
    if (element.style.opacity === '0') {
      element.style.opacity = '1';
    }
  });
  
  // Add welcome text if it doesn't exist
  if (!bannerSection.querySelector('.arabic-welcome-container')) {
    addWelcomeText(bannerSection);
  }
}

/**
 * Creates the home3-banner-section if it doesn't exist
 */
function createHome3BannerSection() {
  // Check if we need to create the section
  if (document.querySelector('.home3-banner-section')) {
    return;
  }
  
  // Find the place to insert the section (before hero-screen-section)
  const heroSection = document.querySelector('.hero-screen-section');
  if (!heroSection) {
    console.error('No hero-screen-section found to insert before');
    return;
  }
  
  // Create the section
  const section = document.createElement('section');
  section.className = 'home3-banner-section';
  section.style.cssText = 'display: block; visibility: visible; opacity: 1; position: relative; padding: 100px 0; background-color: #141414; overflow: visible;';
  
  // Create container
  const container = document.createElement('div');
  container.className = 'w-layout-blockcontainer full-width-container home-3-banner-container w-container';
  container.style.cssText = 'display: block; visibility: visible; opacity: 1; position: relative; z-index: 2;';
  
  // Add triangles and elements
  container.innerHTML = `
    <div class="home-3-left-triangle" style="display: block; visibility: visible; opacity: 1;"></div>
    <div class="home-3-banner-text-wrapper" style="display: block; visibility: visible; opacity: 1; position: relative; z-index: 3; text-align: center;">
      <h1 class="home-3-hero-screen-heading">
        <strong>نطمح أن نكون </strong><span class="text-span-3"><strong>أفضل </strong></span><strong>شركة رياضية متخصصة في وكالة اللاعبين</strong>
      </h1>
      <p class="paragraph-large text-center">
        تُعد وكالة سبورتس فيجيني واحدة من بين 19 وكالة رياضية معتمدة من الاتحاد الدولي لكرة القدم (FIFA) في المملكة، مما يجعلنا رسميًا من الوكالات المعترف بها عالميًا.
      </p>
      <div class="banner-buttons-wrapper home-3-banner-buttons">
        <a href="about-us.html" class="secondary-button home-3-secondary-button w-button">تواصل معنا</a>
      </div>
    </div>
    <div class="home-3-right-triangle" style="display: block; visibility: visible; opacity: 1;"></div>
  `;
  
  // Add to the section
  section.appendChild(container);
  
  // Insert before hero section
  heroSection.parentNode.insertBefore(section, heroSection);
  
  // Add welcome text
  addWelcomeText(section);
}

/**
 * Adds welcome text to the specified section
 */
function addWelcomeText(section) {
  if (!section) return;
  
  // Create welcome container
  const welcomeContainer = document.createElement('div');
  welcomeContainer.className = 'arabic-welcome-container';
  welcomeContainer.style.cssText = 'display: block; visibility: visible; opacity: 1; margin: 0 auto 30px auto; text-align: center; width: 100%; position: relative; z-index: 10;';
  
  // Create welcome text
  const welcomeText = document.createElement('div');
  welcomeText.className = 'arabic-welcome-text';
  welcomeText.textContent = 'مرحباً بك';
  welcomeText.style.cssText = 'display: inline-block; visibility: visible; opacity: 1; font-size: 3.5rem; font-weight: bold; color: #fff; text-shadow: 0 0 15px rgba(88, 187, 79, 0.8); margin: 0 auto; direction: rtl;';
  
  // Add text to container
  welcomeContainer.appendChild(welcomeText);
  
  // Find where to insert
  const bannerTextWrapper = section.querySelector('.home-3-banner-text-wrapper');
  
  if (bannerTextWrapper) {
    // Insert before banner text wrapper
    bannerTextWrapper.parentNode.insertBefore(welcomeContainer, bannerTextWrapper);
  } else {
    // Fallback: insert at beginning of section
    const container = section.querySelector('.w-container, .full-width-container');
    if (container) {
      container.insertBefore(welcomeContainer, container.firstChild);
    } else {
      section.insertBefore(welcomeContainer, section.firstChild);
    }
  }
  
  // Create simple animation
  createSimpleAnimation(welcomeText);
}

/**
 * Creates a simple animation for the welcome text
 */
function createSimpleAnimation(element) {
  if (!element) return;
  
  // Create simple CSS animation to avoid JS performance issues
  const style = document.createElement('style');
  style.textContent = `
    @keyframes welcomePulse {
      0%, 100% { transform: scale(1); text-shadow: 0 0 15px rgba(88, 187, 79, 0.5); }
      50% { transform: scale(1.05); text-shadow: 0 0 20px rgba(88, 187, 79, 0.8); }
    }
    
    .arabic-welcome-text {
      animation: welcomePulse 3s ease-in-out infinite;
    }
  `;
  
  document.head.appendChild(style);
} 