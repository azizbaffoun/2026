// Mobile Slider Fix - Optimized and crash-safe version
(function() {
  'use strict';
  
  let initialized = false;
  let currentSlideIndex = 0;
  let isProcessing = false;
  let touchStartX = 0;
  let resizeTimeout = null;
  
  // Debounce function to prevent excessive calls
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
  
  // Safe DOM query with error handling
  function safeQuery(selector) {
    try {
      return document.querySelector(selector);
    } catch (e) {
      console.warn('SafeQuery error:', e);
      return null;
    }
  }
  
  function safeQueryAll(selector) {
    try {
      return document.querySelectorAll(selector);
    } catch (e) {
      console.warn('SafeQueryAll error:', e);
      return [];
    }
  }
  
  // Check if we're on mobile
  function isMobile() {
    return window.innerWidth <= 767;
  }
  
  // Clean up mobile elements
  function cleanupMobileElements() {
    try {
      const mobileDots = safeQueryAll('.mobile-dot');
      mobileDots.forEach(dot => {
        if (dot && dot.parentNode) {
          dot.parentNode.removeChild(dot);
        }
      });
      
      const originalDots = safeQueryAll('.custom-dot');
      originalDots.forEach(dot => {
        if (dot) {
          dot.style.display = '';
        }
      });
    } catch (e) {
      console.warn('Cleanup error:', e);
    }
  }
  
  // Apply mobile fixes
  function applyMobileFixes() {
    if (!isMobile() || isProcessing) return;
    
    try {
      isProcessing = true;
      
      const slides = safeQueryAll('.slider01_slide');
      const container = safeQuery('.custom-slides-container');
      
      if (!slides.length || !container) {
        isProcessing = false;
        return;
      }
      
      // Fix slide widths
      slides.forEach(slide => {
        if (slide && slide.style) {
          slide.style.setProperty('width', '100%', 'important');
          slide.style.setProperty('flex', '0 0 100%', 'important');
        }
      });
      
      // Fix container
      if (container.style) {
        container.style.setProperty('width', '100%', 'important');
        
        // Set initial position if not set
        if (!container.style.transform || container.style.transform === '') {
          container.style.setProperty('transform', 'translateX(0%)', 'important');
          currentSlideIndex = 0;
        }
      }
      
      // Create mobile pagination if needed
      createMobilePagination();
      
      isProcessing = false;
    } catch (e) {
      console.warn('Mobile fixes error:', e);
      isProcessing = false;
    }
  }
  
  // Create mobile pagination
  function createMobilePagination() {
    try {
      const slides = safeQueryAll('.slider01_slide');
      const paginationContainer = safeQuery('.slider_pagination');
      
      if (!slides.length || !paginationContainer) return;
      
      // Check if already created
      if (paginationContainer.querySelector('.mobile-dot')) return;
      
      // Hide original dots
      const originalDots = safeQueryAll('.custom-dot');
      originalDots.forEach(dot => {
        if (dot) dot.style.display = 'none';
      });
      
      // Create mobile dots
      slides.forEach((slide, index) => {
        const mobileDot = document.createElement('button');
        mobileDot.className = 'mobile-dot';
        mobileDot.type = 'button';
        mobileDot.setAttribute('aria-label', `Slide ${index + 1}`);
        
        // Basic styling
        mobileDot.style.cssText = `
          width: 12px !important;
          height: 12px !important;
          border-radius: 50% !important;
          border: none !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          background: rgba(255, 255, 255, 0.4) !important;
          margin: 0 4px !important;
          padding: 0 !important;
        `;
        
        // Click handler with error handling
        mobileDot.addEventListener('click', function(e) {
          try {
            e.preventDefault();
            e.stopPropagation();
            navigateToSlide(index);
          } catch (err) {
            console.warn('Dot click error:', err);
          }
        });
        
        paginationContainer.appendChild(mobileDot);
      });
      
      // Set first dot as active
      updateActiveDot(0);
      
    } catch (e) {
      console.warn('Mobile pagination error:', e);
    }
  }
  
  // Navigate to specific slide
  function navigateToSlide(slideIndex) {
    try {
      const container = safeQuery('.custom-slides-container');
      const slides = safeQueryAll('.slider01_slide');
      
      if (!container || !slides.length) return;
      
      // Clamp slide index
      slideIndex = Math.max(0, Math.min(slideIndex, slides.length - 1));
      
      // Update transform
      const newTransform = `translateX(-${slideIndex * 100}%)`;
      container.style.setProperty('transform', newTransform, 'important');
      
      // Update current index
      currentSlideIndex = slideIndex;
      
      // Update active dot
      updateActiveDot(slideIndex);
      
    } catch (e) {
      console.warn('Navigate error:', e);
    }
  }
  
  // Update active dot styling
  function updateActiveDot(activeIndex) {
    try {
      const mobileDots = safeQueryAll('.mobile-dot');
      
      mobileDots.forEach((dot, index) => {
        if (!dot) return;
        
        if (index === activeIndex) {
          dot.style.setProperty('background', 'rgb(88, 187, 79)', 'important');
          dot.style.setProperty('transform', 'scale(1.2)', 'important');
        } else {
          dot.style.setProperty('background', 'rgba(255, 255, 255, 0.4)', 'important');
          dot.style.setProperty('transform', 'scale(1)', 'important');
        }
      });
    } catch (e) {
      console.warn('Update dot error:', e);
    }
  }
  
  // Simple touch support
  function addTouchSupport() {
    if (!isMobile()) return;
    
    try {
      const container = safeQuery('.custom-slides-container');
      if (!container || container.hasAttribute('data-touch-enabled')) return;
      
      container.setAttribute('data-touch-enabled', 'true');
      
      container.addEventListener('touchstart', function(e) {
        try {
          touchStartX = e.touches[0].clientX;
        } catch (err) {
          console.warn('Touch start error:', err);
        }
      }, { passive: true });
      
      container.addEventListener('touchend', function(e) {
        try {
          const touchEndX = e.changedTouches[0].clientX;
          const diff = touchStartX - touchEndX;
          
          // Minimum swipe distance
          if (Math.abs(diff) > 50) {
            const slides = safeQueryAll('.slider01_slide');
            if (diff > 0 && currentSlideIndex < slides.length - 1) {
              // Swipe left - next slide
              navigateToSlide(currentSlideIndex + 1);
            } else if (diff < 0 && currentSlideIndex > 0) {
              // Swipe right - previous slide
              navigateToSlide(currentSlideIndex - 1);
            }
          }
        } catch (err) {
          console.warn('Touch end error:', err);
        }
      }, { passive: true });
      
    } catch (e) {
      console.warn('Touch support error:', e);
    }
  }
  
  // Handle desktop restore
  function restoreDesktop() {
    if (isMobile()) return;
    
    try {
      cleanupMobileElements();
      
      const container = safeQuery('.custom-slides-container');
      if (container) {
        container.removeAttribute('data-touch-enabled');
      }
      
    } catch (e) {
      console.warn('Desktop restore error:', e);
    }
  }
  
  // Main initialization
  function init() {
    if (initialized) return;
    
    try {
      if (isMobile()) {
        applyMobileFixes();
        addTouchSupport();
      } else {
        restoreDesktop();
      }
      
      initialized = true;
    } catch (e) {
      console.warn('Init error:', e);
    }
  }
  
  // Debounced resize handler
  const handleResize = debounce(function() {
    try {
      initialized = false;
      
      if (isMobile()) {
        cleanupMobileElements();
        applyMobileFixes();
        addTouchSupport();
      } else {
        restoreDesktop();
      }
      
      initialized = true;
    } catch (e) {
      console.warn('Resize error:', e);
    }
  }, 250);
  
  // Safe event listeners
  function addEventListeners() {
    try {
      // DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
      
      // Window load (fallback)
      window.addEventListener('load', init);
      
      // Resize
      window.addEventListener('resize', handleResize);
      
    } catch (e) {
      console.warn('Event listener error:', e);
    }
  }
  
  // Start the script
  addEventListeners();
  
})(); 