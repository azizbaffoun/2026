// Custom Animations JavaScript
(function() {
  'use strict';

  // Utility function to check if element is in viewport
  function isInViewport(element, threshold = 0.2) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight * (1 - threshold) && rect.bottom >= windowHeight * threshold;
  }

  // Mission Section Animation
  function initializeMissionAnimations() {
    const missionWrapper = document.querySelector('.about-us-mission-wrapper');
    if (!missionWrapper) {
      return;
    }

    const animatableElements = missionWrapper.querySelectorAll('.uppercase-paragraph, .about-us-heading, .paragraph-large, .mission-continuation');
    
    function triggerMissionAnimations() {
      missionWrapper.classList.add('mission-animated');
      
      animatableElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('animate');
        }, index * 200);
      });
    }

    // Set up intersection observer
    const missionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !missionWrapper.classList.contains('mission-animated')) {
          triggerMissionAnimations();
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });

    missionObserver.observe(missionWrapper);

    // Also trigger if already in view
    setTimeout(() => {
      if (isInViewport(missionWrapper) && !missionWrapper.classList.contains('mission-animated')) {
        triggerMissionAnimations();
      }
    }, 500);
  }

  // Values Section Animation
  function initializeValuesAnimations() {
    const valuesSection = document.querySelector('.section');
    const titleWrapper = valuesSection?.querySelector('.our-values-title-wrapper');
    const valueCards = valuesSection?.querySelectorAll('.our-values-wrapper');
    
    if (!valuesSection || !titleWrapper || !valueCards.length) {
      return;
    }
    
    function triggerValuesAnimations() {
      setTimeout(() => {
        titleWrapper.classList.add('animate');
      }, 200);
      
      valueCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate');
        }, 600 + (index * 200));
      });
    }
    
    const valuesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !valuesSection.classList.contains('values-animated')) {
          valuesSection.classList.add('values-animated');
          triggerValuesAnimations();
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });
    
    valuesObserver.observe(valuesSection);
    
    setTimeout(() => {
      if (isInViewport(valuesSection) && !valuesSection.classList.contains('values-animated')) {
        valuesSection.classList.add('values-animated');
        triggerValuesAnimations();
      }
    }, 1000);
  }

  // Podcast Section Animation
  function initializePodcastAnimations() {
    const podcastSection = document.querySelector('.podcast-section');
    const podcastContainer = podcastSection?.querySelector('.podcast-container');
    const podcastTitle = podcastSection?.querySelector('.podcast-title');
    
    if (!podcastSection || !podcastContainer) {
      return;
    }
    
    function triggerPodcastAnimations() {
      podcastSection.classList.add('animate');
      
      if (podcastTitle) {
        setTimeout(() => {
          podcastTitle.classList.add('animate');
        }, 300);
      }
    }
    
    const podcastObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !podcastSection.classList.contains('podcast-animated')) {
          podcastSection.classList.add('podcast-animated');
          triggerPodcastAnimations();
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });
    
    podcastObserver.observe(podcastSection);
    
    setTimeout(() => {
      if (isInViewport(podcastSection) && !podcastSection.classList.contains('podcast-animated')) {
        podcastSection.classList.add('podcast-animated');
        triggerPodcastAnimations();
      }
    }, 800);
  }

  // Text Content Cleanup and Services Banner Creation
  function cleanupTextContent() {
    // Clean up text content in mission wrapper
    const missionWrapper = document.querySelector('.about-us-mission-wrapper');
    if (missionWrapper) {
      const paragraphs = missionWrapper.querySelectorAll('.paragraph-large');
      paragraphs.forEach(p => {
        if (p.textContent.includes('نؤمن في وكالة سبورت فيجن')) {
          const cleanText = p.textContent
            .replace(/\s+/g, ' ')
            .replace(/\n/g, ' ')
            .trim();
          p.innerHTML = cleanText;
          p.classList.add('clean-text');
        }
      });
    }
  }

  // Initialize all animations
  function initializeAllAnimations() {
    cleanupTextContent();
    initializeMissionAnimations();
    initializeValuesAnimations();
    initializePodcastAnimations();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllAnimations);
  } else {
    initializeAllAnimations();
  }

  // Also initialize after a delay to ensure all elements are loaded
  setTimeout(initializeAllAnimations, 1000);
})(); 