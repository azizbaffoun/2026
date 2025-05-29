// Mobile Slider Fix - Force single card display
function forceMobileSingleCard() {
  if (window.innerWidth <= 767) {
    const slides = document.querySelectorAll('.slider01_slide');
    const container = document.querySelector('.custom-slides-container');
    const pagination = document.querySelectorAll('.custom-dot');
    
    slides.forEach((slide, index) => {
      slide.style.setProperty('width', '100%', 'important');
      slide.style.setProperty('min-width', '100%', 'important');
      slide.style.setProperty('max-width', '100%', 'important');
      slide.style.setProperty('flex', '0 0 100%', 'important');
      slide.style.setProperty('flex-shrink', '0', 'important');
    });
    
    if (container) {
      container.style.setProperty('width', '100%', 'important');
      
      // Fix transform for single-card sliding
      const currentTransform = container.style.transform;
      if (currentTransform && currentTransform.includes('translateX')) {
        // Extract the current percentage
        const match = currentTransform.match(/translateX\((-?\d+(?:\.\d+)?)%\)/);
        if (match) {
          const currentPercent = parseFloat(match[1]);
          
          // Calculate which slide should be active based on current transform
          // For mobile: each slide is 100% width, so slide N should be at -N*100%
          let activeSlideIndex = 0;
          
          if (currentPercent <= -10) {
            // Calculate the actual slide index for mobile
            activeSlideIndex = Math.round(Math.abs(currentPercent) / 100);
            activeSlideIndex = Math.min(activeSlideIndex, slides.length - 1);
          }
          
          // Set correct transform for single-card navigation
          const newTransform = `translateX(-${activeSlideIndex * 100}%)`;
          container.style.setProperty('transform', newTransform, 'important');
          
          console.log(`Mobile transform fixed: ${currentTransform} → ${newTransform} (slide ${activeSlideIndex + 1})`);
        }
      }
    }
    
    console.log(`Mobile slider fix applied - ${slides.length} slides found`);
  }
}

// Create mobile pagination with 7 individual dots
function createMobilePagination() {
  if (window.innerWidth <= 767) {
    const slides = document.querySelectorAll('.slider01_slide');
    const paginationContainer = document.querySelector('.slider_pagination');
    
    if (!slides.length || !paginationContainer) return;
    
    // Check if mobile pagination already created
    if (paginationContainer.querySelector('.mobile-dot')) return;
    
    // Hide original group dots on mobile
    const originalDots = paginationContainer.querySelectorAll('.custom-dot');
    originalDots.forEach(dot => {
      dot.style.display = 'none';
    });
    
    // Create 7 individual dots for mobile
    slides.forEach((slide, index) => {
      const mobileDot = document.createElement('button');
      mobileDot.className = 'mobile-dot';
      mobileDot.type = 'button';
      mobileDot.setAttribute('aria-label', `Show slide ${index + 1}`);
      mobileDot.setAttribute('data-slide-index', index);
      
      // Style the mobile dot - perfect circles
      mobileDot.style.cssText = `
        width: 12px !important;
        height: 12px !important;
        border-radius: 50% !important;
        border: none !important;
        outline: none !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        background: rgba(255, 255, 255, 0.4) !important;
        transform: scale(1) !important;
        margin: 0 4px !important;
        padding: 0 !important;
        flex-shrink: 0 !important;
      `;
      
      // Add click handler for mobile dot - slide to exact card
      mobileDot.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const container = document.querySelector('.custom-slides-container');
        if (container) {
          // Slide to the exact card: slide N is at -N*100%
          const newTransform = `translateX(-${index * 100}%)`;
          container.style.setProperty('transform', newTransform, 'important');
          
          // Update active mobile dot
          const allMobileDots = paginationContainer.querySelectorAll('.mobile-dot');
          allMobileDots.forEach(d => {
            d.classList.remove('active-mobile-dot');
            d.style.setProperty('background', 'rgba(255, 255, 255, 0.4)', 'important');
            d.style.setProperty('transform', 'scale(1)', 'important');
          });
          
          this.classList.add('active-mobile-dot');
          this.style.setProperty('background', 'rgb(88, 187, 79)', 'important');
          this.style.setProperty('transform', 'scale(1.2)', 'important');
          
          // Store current slide index
          container.setAttribute('data-current-slide', index);
          
          console.log(`Mobile navigation: moved to slide ${index + 1} (${newTransform})`);
        }
      });
      
      paginationContainer.appendChild(mobileDot);
    });
    
    // Set first dot as active initially
    const firstMobileDot = paginationContainer.querySelector('.mobile-dot');
    if (firstMobileDot) {
      firstMobileDot.classList.add('active-mobile-dot');
      firstMobileDot.style.setProperty('background', 'rgb(88, 187, 79)', 'important');
      firstMobileDot.style.setProperty('transform', 'scale(1.2)', 'important');
    }
    
    // Set initial slide to first one
    const container = document.querySelector('.custom-slides-container');
    if (container) {
      container.style.setProperty('transform', 'translateX(0%)', 'important');
      container.setAttribute('data-current-slide', '0');
    }
    
    console.log(`Created ${slides.length} mobile pagination dots`);
  }
}

// Touch/Swipe functionality for mobile
function addTouchSupport() {
  if (window.innerWidth <= 767) {
    const container = document.querySelector('.custom-slides-container');
    const paginationContainer = document.querySelector('.slider_pagination');
    
    if (!container || container.hasAttribute('data-touch-enabled')) return;
    
    container.setAttribute('data-touch-enabled', 'true');
    
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;
    
    // Touch start
    container.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      currentX = startX;
      currentY = startY;
      isDragging = true;
      
      // Disable transitions during drag
      container.style.setProperty('transition', 'none', 'important');
    }, { passive: true });
    
    // Touch move
    container.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
      
      currentX = e.touches[0].clientX;
      currentY = e.touches[0].clientY;
      
      const diffX = currentX - startX;
      const diffY = Math.abs(currentY - startY);
      
      // Only handle horizontal swipes
      if (Math.abs(diffX) > diffY && Math.abs(diffX) > 10) {
        e.preventDefault(); // Prevent scrolling
      }
    }, { passive: false });
    
    // Touch end
    container.addEventListener('touchend', function(e) {
      if (!isDragging) return;
      
      isDragging = false;
      
      // Re-enable transitions
      container.style.setProperty('transition', 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)', 'important');
      
      const diffX = currentX - startX;
      const diffY = Math.abs(currentY - startY);
      
      // Only handle horizontal swipes
      if (Math.abs(diffX) > diffY && Math.abs(diffX) > 50) {
        const currentSlide = parseInt(container.getAttribute('data-current-slide') || '0');
        const totalSlides = document.querySelectorAll('.slider01_slide').length;
        let newSlide = currentSlide;
        
        if (diffX > 0) {
          // Swipe right - go to previous slide
          newSlide = Math.max(0, currentSlide - 1);
        } else {
          // Swipe left - go to next slide
          newSlide = Math.min(totalSlides - 1, currentSlide + 1);
        }
        
        // Navigate to new slide
        if (newSlide !== currentSlide) {
          const newTransform = `translateX(-${newSlide * 100}%)`;
          container.style.setProperty('transform', newTransform, 'important');
          container.setAttribute('data-current-slide', newSlide);
          
          // Update active dot
          const allMobileDots = paginationContainer.querySelectorAll('.mobile-dot');
          allMobileDots.forEach((dot, index) => {
            dot.classList.remove('active-mobile-dot');
            dot.style.setProperty('background', 'rgba(255, 255, 255, 0.4)', 'important');
            dot.style.setProperty('transform', 'scale(1)', 'important');
            
            if (index === newSlide) {
              dot.classList.add('active-mobile-dot');
              dot.style.setProperty('background', 'rgb(88, 187, 79)', 'important');
              dot.style.setProperty('transform', 'scale(1.2)', 'important');
            }
          });
          
          console.log(`Touch navigation: moved to slide ${newSlide + 1}`);
        }
      }
    }, { passive: true });
    
    console.log('Touch/swipe support added');
  }
}

// Restore desktop pagination
function restoreDesktopPagination() {
  if (window.innerWidth > 767) {
    const paginationContainer = document.querySelector('.slider_pagination');
    if (!paginationContainer) return;
    
    // Remove mobile dots
    const mobileDots = paginationContainer.querySelectorAll('.mobile-dot');
    mobileDots.forEach(dot => dot.remove());
    
    // Show original group dots
    const originalDots = paginationContainer.querySelectorAll('.custom-dot');
    originalDots.forEach(dot => {
      dot.style.display = '';
    });
    
    // Remove touch support
    const container = document.querySelector('.custom-slides-container');
    if (container) {
      container.removeAttribute('data-touch-enabled');
      container.removeAttribute('data-current-slide');
    }
    
    console.log('Restored desktop pagination');
  }
}

// Enhanced function to handle slider navigation clicks
function handleMobileSliderNavigation() {
  if (window.innerWidth <= 767) {
    const pagination = document.querySelectorAll('.custom-dot');
    const container = document.querySelector('.custom-slides-container');
    
    pagination.forEach((dot, index) => {
      if (!dot.hasAttribute('data-mobile-fixed')) {
        dot.setAttribute('data-mobile-fixed', 'true');
        
        dot.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          if (container) {
            const newTransform = `translateX(-${index * 100}%)`;
            container.style.setProperty('transform', newTransform, 'important');
            
            // Update active dot
            pagination.forEach(d => {
              d.classList.remove('active-dot');
              d.style.setProperty('background', 'rgba(255, 255, 255, 0.4)', 'important');
              d.style.setProperty('transform', 'scale(1)', 'important');
            });
            
            this.classList.add('active-dot');
            this.style.setProperty('background', 'rgb(88, 187, 79)', 'important');
            this.style.setProperty('transform', 'scale(1.2)', 'important');
            
            console.log(`Mobile navigation: moved to slide ${index + 1}`);
          }
        });
      }
    });
  }
}

// Run immediately
forceMobileSingleCard();
createMobilePagination();
handleMobileSliderNavigation();
addTouchSupport();

// Run on load
window.addEventListener('load', function() {
  forceMobileSingleCard();
  createMobilePagination();
  handleMobileSliderNavigation();
  addTouchSupport();
});

// Run on resize
window.addEventListener('resize', function() {
  forceMobileSingleCard();
  
  // Handle pagination based on screen size
  if (window.innerWidth <= 767) {
    createMobilePagination();
    addTouchSupport();
  } else {
    restoreDesktopPagination();
  }
  
  handleMobileSliderNavigation();
});

// Run periodically to catch dynamic changes
setInterval(function() {
  forceMobileSingleCard();
  createMobilePagination();
  handleMobileSliderNavigation();
  addTouchSupport();
}, 1000);

// Run when DOM changes (using MutationObserver)
if (window.MutationObserver) {
  const observer = new MutationObserver(function(mutations) {
    let shouldFix = false;
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' || mutation.type === 'childList') {
        shouldFix = true;
      }
    });
    if (shouldFix && window.innerWidth <= 767) {
      forceMobileSingleCard();
      createMobilePagination();
      handleMobileSliderNavigation();
      addTouchSupport();
    }
  });
  
  const sliderContainer = document.querySelector('.slider01_comp');
  if (sliderContainer) {
    observer.observe(sliderContainer, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['style']
    });
  }
} 