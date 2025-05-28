// Animation Controller for Sports Vision Website
// Handles scroll-triggered animations and interactive effects

class AnimationController {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
    } else {
      this.setupAnimations();
    }
  }

  setupAnimations() {
    this.setupIntersectionObserver();
    this.setupParallaxEffects();
    this.setupHoverEffects();
    this.setupFormAnimations();
    this.setupCounterAnimations();
  }

  // Intersection Observer for scroll-triggered animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Special handling for staggered animations
          if (entry.target.classList.contains('stagger-children')) {
            this.staggerChildAnimations(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll(`
      .partners-wrapper,
      .form-wrapper,
      .footer-wrapper,
      .partners-logo-grid img,
      .footer-links-wrapper,
      .social-media-icon,
      .animate-on-scroll
    `);

    animateElements.forEach(el => {
      observer.observe(el);
    });
  }

  // Stagger animations for child elements
  staggerChildAnimations(parent) {
    const children = parent.querySelectorAll('.stagger-item');
    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.add('animate');
      }, index * 100);
    });
  }

  // Parallax effects for background elements
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.rectangle, .form-section::before');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      parallaxElements.forEach(element => {
        if (element.style) {
          element.style.transform = `translateY(${rate}px)`;
        }
      });

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Enhanced hover effects
  setupHoverEffects() {
    // Partner logos enhanced hover
    const partnerLogos = document.querySelectorAll('.partners-logo-grid img');
    partnerLogos.forEach(logo => {
      logo.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'scale(1.1) rotateY(0deg)';
        e.target.style.filter = 'grayscale(0%) brightness(1.1)';
      });

      logo.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'scale(1) rotateY(0deg)';
        e.target.style.filter = 'grayscale(100%) brightness(0.8)';
      });
    });

    // Social media icons ripple effect
    const socialIcons = document.querySelectorAll('.social-media-icon');
    socialIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
        this.createRippleEffect(e);
      });
    });

    // Footer links arrow animation
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
      link.addEventListener('mouseenter', (e) => {
        const arrow = e.target.querySelector('::before');
        if (arrow) {
          arrow.style.opacity = '1';
          arrow.style.transform = 'translateX(0)';
        }
      });
    });
  }

  // Form animations and validation feedback
  setupFormAnimations() {
    const emailInput = document.querySelector('.form-text-field');
    const submitButton = document.querySelector('.primary-button-black');
    const form = document.querySelector('#email-form');

    if (!emailInput || !submitButton || !form) return;

    // Input focus animations
    emailInput.addEventListener('focus', () => {
      emailInput.style.transform = 'translateY(-2px)';
      emailInput.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.2)';
    });

    emailInput.addEventListener('blur', () => {
      emailInput.style.transform = 'translateY(0)';
      emailInput.style.boxShadow = 'none';
    });

    // Button hover shimmer effect
    submitButton.addEventListener('mouseenter', () => {
      const shimmer = submitButton.querySelector('::before');
      if (shimmer) {
        shimmer.style.left = '100%';
      }
    });

    // Form submission animation
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.animateFormSubmission(submitButton);
    });

    // Real-time email validation
    emailInput.addEventListener('input', (e) => {
      this.validateEmail(e.target);
    });
  }

  // Counter animations for statistics
  setupCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-counter'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // Utility functions
  createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  validateEmail(input) {
    const email = input.value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    if (email.length > 0) {
      if (isValid) {
        input.style.borderColor = '#28a745';
        input.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
      } else {
        input.style.borderColor = '#dc3545';
        input.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
      }
    } else {
      input.style.borderColor = '';
      input.style.boxShadow = '';
    }
  }

  animateFormSubmission(button) {
    const originalText = button.value;
    button.value = 'جاري الإرسال...';
    button.disabled = true;
    button.style.transform = 'scale(0.95)';

    // Simulate form submission
    setTimeout(() => {
      button.value = 'تم الإرسال ✓';
      button.style.backgroundColor = '#28a745';
      button.style.transform = 'scale(1)';

      setTimeout(() => {
        button.value = originalText;
        button.disabled = false;
        button.style.backgroundColor = '';
        button.style.transform = '';
      }, 2000);
    }, 1500);
  }

  // Performance optimization
  debounce(func, wait) {
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

  // Reduced motion support
  respectsReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}

// CSS for ripple effect
const rippleCSS = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize animations when script loads
new AnimationController();

// Export for potential external use
window.AnimationController = AnimationController; 