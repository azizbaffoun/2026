// Mobile Menu Fix
document.addEventListener('DOMContentLoaded', function() {
  // Simple menu toggle functionality
  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.tablet-menu');
  const closeButton = document.querySelector('.close-menu-button');
  const navOverlay = document.querySelector('.w-nav-overlay');
  
  if (menuButton && mobileMenu && closeButton) {
    // Mobile menu open
    menuButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (navOverlay) {
        navOverlay.style.display = 'block';
        navOverlay.style.width = '100vw';
        navOverlay.style.height = '100vh';
        navOverlay.style.opacity = '1';
        navOverlay.style.transform = 'translateX(0)';
        navOverlay.style.transition = 'opacity 0.3s ease';
      }
      
      if (mobileMenu) {
        mobileMenu.style.display = 'flex';
        mobileMenu.style.opacity = '1';
        mobileMenu.style.visibility = 'visible';
      }
    });
    
    // Mobile menu close
    closeButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (navOverlay) {
        navOverlay.style.display = 'none';
        navOverlay.style.opacity = '0';
      }
      
      if (mobileMenu) {
        mobileMenu.style.display = 'none';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.visibility = 'hidden';
      }
    });
  }
  
  // Prevent clicks on menu items from bubbling up
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  if (mobileNavLinks) {
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Close menu when link is clicked
        if (navOverlay) {
          navOverlay.style.display = 'none';
        }
        
        if (mobileMenu) {
          mobileMenu.style.display = 'none';
        }
      });
    });
  }
  
  // Fix for menu visibility on resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 991) {
      // Reset mobile menu state on desktop
      if (navOverlay) {
        navOverlay.style.display = 'none';
      }
      if (mobileMenu) {
        mobileMenu.style.display = 'none';
      }
    }
  });
  
  // Fix for console logging issues - override console with limited versions
  if (window.location.search.includes('disable_console=true') || 
      navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
    
    // Store original console methods
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info
    };
    
    // Limit console output to reduce performance impact
    const MAX_LOGS = 10;
    let logCount = 0;
    
    // Override console methods
    console.log = function() {
      if (logCount < MAX_LOGS) {
        originalConsole.log.apply(console, arguments);
        logCount++;
      }
    };
    
    console.error = function() {
      if (logCount < MAX_LOGS) {
        originalConsole.error.apply(console, arguments);
        logCount++;
      }
    };
    
    console.warn = function() {
      if (logCount < MAX_LOGS) {
        originalConsole.warn.apply(console, arguments);
        logCount++;
      }
    };
    
    console.info = function() {
      if (logCount < MAX_LOGS) {
        originalConsole.info.apply(console, arguments);
        logCount++;
      }
    };
  }
}); 