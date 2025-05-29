// Perfect RTL 3-Slide Carousel - Complete Fix
document.addEventListener('DOMContentLoaded', function() {
  // Wait for Webflow to settle, then take complete control
  setTimeout(function() {
    const slider = document.querySelector('.slider01_comp');
    const mask = document.querySelector('.slider01_mask');
    const slides = document.querySelectorAll('.slider01_slide');
    const dotsContainer = document.querySelector('.slider_pagination');
    
    if (!slider || !mask || !slides.length || !dotsContainer) {
      return;
    }
    
    let currentGroup = 0;
    const totalGroups = 3; // Always 3 groups for 7 slides
    
    // STEP 1: Completely reset and rebuild structure
    function initializeCarousel() {
      // Clear mask and create new container
      mask.innerHTML = '';
      
      const slidesContainer = document.createElement('div');
      slidesContainer.className = 'custom-slides-container';
      slidesContainer.style.cssText = `
        display: flex !important;
        width: calc(${slides.length} * 33.333%) !important;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
        transform: translateX(0%) !important;
        height: auto !important;
        align-items: stretch !important;
      `;
      
      // Reset mask styles
      mask.style.cssText = `
        width: 100% !important;
        overflow: hidden !important;
        position: relative !important;
        height: auto !important;
        transform: none !important;
        direction: ltr !important;
      `;
      
      // Set up each slide with perfect 3-slide display
      slides.forEach((slide, index) => {
        slide.style.cssText = `
          width: calc(100% / ${slides.length}) !important;
          min-width: calc(100% / ${slides.length}) !important;
          max-width: calc(100% / ${slides.length}) !important;
          flex-shrink: 0 !important;
          padding: 0 12px !important;
          box-sizing: border-box !important;
          display: block !important;
          position: relative !important;
          opacity: 1 !important;
          transform: none !important;
          left: auto !important;
          top: auto !important;
          direction: rtl !important;
          height: auto !important;
        `;
        
        // Remove Webflow attributes that might interfere
        slide.removeAttribute('aria-hidden');
        slide.removeAttribute('style');
        
        // Re-apply our styles after removing Webflow ones
        slide.style.cssText = `
          width: calc(100% / ${slides.length}) !important;
          min-width: calc(100% / ${slides.length}) !important;
          max-width: calc(100% / ${slides.length}) !important;
          flex-shrink: 0 !important;
          padding: 0 12px !important;
          box-sizing: border-box !important;
          display: block !important;
          position: relative !important;
          opacity: 1 !important;
          transform: none !important;
          direction: rtl !important;
        `;
        
        slidesContainer.appendChild(slide);
      });
      
      mask.appendChild(slidesContainer);
      return slidesContainer;
    }
    
    // STEP 2: Create custom pagination with exactly 3 dots
    function createCustomPagination() {
      dotsContainer.innerHTML = '';
      dotsContainer.style.cssText = `
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 12px !important;
        margin-top: 30px !important;
        padding: 0 !important;
      `;
      
      for (let i = 0; i < totalGroups; i++) {
        const dot = document.createElement('button');
        dot.className = `custom-dot group-${i}`;
        dot.setAttribute('type', 'button');
        dot.setAttribute('aria-label', `Show group ${i + 1}`);
        
        dot.style.cssText = `
          width: 14px !important;
          height: 14px !important;
          border-radius: 50% !important;
          border: none !important;
          outline: none !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          background: ${i === 0 ? '#58bb4f' : 'rgba(255, 255, 255, 0.4)'} !important;
          transform: ${i === 0 ? 'scale(1.2)' : 'scale(1)'} !important;
          margin: 0 !important;
          padding: 0 !important;
        `;
        
        // Add click event with proper binding
        dot.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          slideToGroup(i);
        });
        
        dot.addEventListener('mouseenter', function() {
          if (i !== currentGroup) {
            dot.style.background = 'rgba(88, 187, 79, 0.6) !important';
          }
        });
        
        dot.addEventListener('mouseleave', function() {
          if (i !== currentGroup) {
            dot.style.background = 'rgba(255, 255, 255, 0.4) !important';
          }
        });
        
        dotsContainer.appendChild(dot);
      }
    }
    
    // STEP 3: Handle sliding between groups
    function slideToGroup(groupIndex) {
      const slidesContainer = document.querySelector('.custom-slides-container');
      const dots = document.querySelectorAll('.custom-dot');
      
      if (!slidesContainer) {
        return;
      }
      
      currentGroup = groupIndex;
      
      // Calculate exact transform for each group
      let translateX = 0;
      
      if (groupIndex === 0) {
        // Show slides 1, 2, 3 (0, 1, 2)
        translateX = 0;
      } else if (groupIndex === 1) {
        // Show slides 4, 5, 6 (3, 4, 5) - move by 3 slides
        translateX = -42.857; // (3/7) * 100
      } else if (groupIndex === 2) {
        // Show slide 7 centered (6) - move by 4 slides to center the last one
        translateX = -57.14; // (4/7) * 100
      }
      
      slidesContainer.style.transform = `translateX(${translateX}%)`;
      
      // Update pagination dots - FIXED VERSION
      dots.forEach((dot, index) => {
        if (index === groupIndex) {
          // Active dot - green and larger
          dot.style.setProperty('background', '#58bb4f', 'important');
          dot.style.setProperty('transform', 'scale(1.2)', 'important');
          dot.classList.add('active-dot');
        } else {
          // Inactive dots - white/transparent and normal size
          dot.style.setProperty('background', 'rgba(255, 255, 255, 0.4)', 'important');
          dot.style.setProperty('transform', 'scale(1)', 'important');
          dot.classList.remove('active-dot');
        }
      });
    }
    
    // STEP 4: Initialize everything
    const slidesContainer = initializeCarousel();
    createCustomPagination();
    slideToGroup(0);
    
    // STEP 5: Use more efficient observation strategy
    const observer = new MutationObserver(function(mutations) {
      let needsReset = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          needsReset = true;
        }
      });
      
      if (needsReset) {
        // Throttle fixes to avoid infinite loops
        if (!observer.fixing) {
          observer.fixing = true;
          
          // Apply fixes in a single batch
          slides.forEach(slide => {
            slide.style.cssText = `
              width: calc(100% / ${slides.length}) !important;
              min-width: calc(100% / ${slides.length}) !important;
              max-width: calc(100% / ${slides.length}) !important;
              flex-shrink: 0 !important;
              padding: 0 12px !important;
              box-sizing: border-box !important;
              display: block !important;
              position: relative !important;
              opacity: 1 !important;
              transform: none !important;
              direction: rtl !important;
            `;
          });
          
          mask.style.transform = 'none !important';
          
          // Reset flag after a short delay
          setTimeout(() => {
            observer.fixing = false;
          }, 100);
        }
      }
    });
    
    // Watch for Webflow interference but with reduced sensitivity
    observer.observe(slider, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['style'],
    });
    
    // Add arrow controls
    const leftArrow = document.querySelector('.slider_arrow.is-left');
    const rightArrow = document.querySelector('.slider_arrow.w-slider-arrow-right');
    
    if (leftArrow) {
      leftArrow.addEventListener('click', function(e) {
        e.preventDefault();
        slideToGroup(Math.max(0, currentGroup - 1));
      });
    }
    
    if (rightArrow) {
      rightArrow.addEventListener('click', function(e) {
        e.preventDefault();
        slideToGroup(Math.min(totalGroups - 1, currentGroup + 1));
      });
    }
    
    // Handle responsive behavior better
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        // Reinitialize only if necessary
        if (window.innerWidth <= 767 && slider.dataset.mobile !== 'true') {
          slider.dataset.mobile = 'true';
          initializeCarousel();
          createCustomPagination();
          slideToGroup(0);
        } else if (window.innerWidth > 767 && slider.dataset.mobile === 'true') {
          slider.dataset.mobile = 'false';
          initializeCarousel();
          createCustomPagination();
          slideToGroup(0);
        }
      }, 250); // Throttle resize events
    });
    
  }, 1000); // Increased delay to ensure Webflow is fully loaded
}); 