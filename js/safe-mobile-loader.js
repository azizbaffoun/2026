// Safe Mobile Loader - Prevents crashes on mobile devices
(function() {
  'use strict';
  
  // Global error handler to prevent crashes
  window.addEventListener('error', function(e) {
    console.warn('Script error caught:', e.error);
    e.preventDefault();
    return true;
  });
  
  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', function(e) {
    console.warn('Promise rejection caught:', e.reason);
    e.preventDefault();
  });
  
  // Mobile detection
  function isMobile() {
    return window.innerWidth <= 767 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  // Safe script loader
  function loadScript(src, callback) {
    if (!src) {
      if (callback) callback();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    
    script.onload = function() {
      console.log('Script loaded:', src);
      if (callback) callback();
    };
    
    script.onerror = function() {
      console.warn('Script failed to load:', src);
      if (callback) callback(); // Continue loading other scripts
    };
    
    document.head.appendChild(script);
  }
  
  // Disable problematic animations on mobile
  function disableHeavyAnimations() {
    if (isMobile()) {
      // Disable heavy CSS animations
      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 767px) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-delay: 0.01ms !important;
            transition-duration: 0.01ms !important;
            transition-delay: 0.01ms !important;
          }
          
          /* Keep essential animations */
          .mobile-dot {
            transition: all 0.3s ease !important;
          }
          
          .custom-slides-container {
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
        }
      `;
      document.head.appendChild(style);
      console.log('Heavy animations disabled for mobile');
    }
  }
  
  // Safe initialization sequence
  function safeInit() {
    try {
      // Disable heavy animations first
      disableHeavyAnimations();
      
      // Load mobile slider fix immediately if mobile
      if (isMobile()) {
        console.log('Mobile detected, loading mobile slider fix...');
        
        // Load mobile slider fix with error handling
        loadScript('js/mobile-slider-fix.js', function() {
          console.log('Mobile slider fix loaded or failed gracefully');
        });
        
        // Skip heavy scripts on mobile to prevent crashes
        console.log('Skipping heavy animations on mobile to prevent crashes');
        return;
      }
      
      // Desktop: Load all scripts normally
      console.log('Desktop detected, loading all scripts...');
      
      const scripts = [
        'js/animations.js',
        'js/typing-animation.js'
      ];
      
      let loadedCount = 0;
      scripts.forEach(function(script) {
        loadScript(script, function() {
          loadedCount++;
          if (loadedCount === scripts.length) {
            console.log('All desktop scripts loaded');
          }
        });
      });
      
    } catch (e) {
      console.warn('Safe init error:', e);
    }
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeInit);
  } else {
    safeInit();
  }
  
  // Prevent memory leaks
  window.addEventListener('beforeunload', function() {
    // Clear any intervals or timeouts if they exist
    for (let i = 1; i < 99999; i++) {
      window.clearTimeout(i);
      window.clearInterval(i);
    }
  });
  
})(); 