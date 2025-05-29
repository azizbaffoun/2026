document.addEventListener('DOMContentLoaded', function() {
  // The three phrases to animate
  const phrases = [
    "حيث يبدأ النجاح<span class='green-dots'>...</span>",
    "اذ نرسم طريقك للاحتراف<span class='green-dots'>...</span>",
    "و نكون شريكك نحو القمة<span class='green-dots'>...</span>"
  ];
  
  // Get the heading element where we'll show the animation
  const headingElement = document.querySelector('.hero-screen-heading');
  
  if (!headingElement) {
    console.error('Hero heading element not found');
    return;
  }
  
  // Set initial content - start with the first phrase
  headingElement.innerHTML = phrases[0];
  
  // Only animate when user is viewing the section
  let isAnimating = false;
  let phraseIndex = 0;
  let animationInterval;
  
  function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    
    phraseIndex = 0;
    let currentIndex = 0;
    
    function switchPhrase() {
      // Simple fade transition between phrases
      headingElement.style.opacity = '0';
      
      setTimeout(() => {
        headingElement.innerHTML = phrases[currentIndex];
        headingElement.style.opacity = '1';
        
        currentIndex = (currentIndex + 1) % phrases.length;
      }, 500);
    }
    
    // Initial display
    headingElement.innerHTML = phrases[0];
    headingElement.style.opacity = '1';
    
    // Change phrase every 3 seconds
    animationInterval = setInterval(switchPhrase, 3000);
  }
  
  function stopAnimation() {
    if (!isAnimating) return;
    isAnimating = false;
    
    clearInterval(animationInterval);
    // Keep the last phrase displayed
    headingElement.innerHTML = phrases[phraseIndex];
    headingElement.style.opacity = '1';
  }
  
  // Start animation by default
  startAnimation();
  
  // Optional: Add scroll-based animation control
  // Only animate when section is visible
  /*
  const heroSection = document.querySelector('.hero-screen-section');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(heroSection);
  }
  */
}); 