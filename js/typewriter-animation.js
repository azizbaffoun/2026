// Typewriter Animation Script
document.addEventListener('DOMContentLoaded', function() {
  // Arabic text to type
  const texts = [
    'سبورتس فيجن',
    'شريكك الأول في عالم الرياضة',
    'شغف، احتراف، نجاح'
  ];
  
  const container = document.querySelector('.typewriter-container');
  
  // Clear any existing elements
  container.innerHTML = '';
  
  // Create text elements
  texts.forEach((text) => {
    const element = document.createElement('h1');
    element.className = 'typewriter-text hero-screen-heading';
    element.innerHTML = `<span class="green-dots">...</span>`;
    element.style.display = 'none';
    element.dataset.fullText = text;
    container.appendChild(element);
  });
  
  const textElements = document.querySelectorAll('.typewriter-text');
  let currentIndex = 0;
  let currentText = '';
  let isDeleting = false;
  
  function typeText() {
    const element = textElements[currentIndex];
    const fullText = element.dataset.fullText;
    
    // Make current element visible and active
    element.style.display = 'inline-block';
    element.classList.add('active');
    
    // Handle typing and deleting states
    if (!isDeleting) {
      // Add RTL typing animation
      element.classList.add('typing');
      
      // Type character by character for RTL text
      if (currentText.length < fullText.length) {
        currentText = fullText.substring(0, currentText.length + 1);
        element.innerHTML = currentText + '<span class="green-dots">...</span>';
        setTimeout(typeText, 150);
      } else {
        // Text fully typed, pause before deleting
        isDeleting = true;
        element.classList.remove('typing');
        setTimeout(typeText, 2000);
      }
    } else {
      // Add deleting animation
      element.classList.add('deleting');
      element.classList.remove('typing');
      
      // Delete character by character
      if (currentText.length > 0) {
        currentText = fullText.substring(0, currentText.length - 1);
        element.innerHTML = currentText + '<span class="green-dots">...</span>';
        setTimeout(typeText, 75);
      } else {
        // Text fully deleted, move to next text
        isDeleting = false;
        element.classList.remove('active', 'deleting');
        element.style.display = 'none';
        
        // Move to next text
        currentIndex = (currentIndex + 1) % texts.length;
        setTimeout(typeText, 500);
      }
    }
  }
  
  // Start the animation
  setTimeout(typeText, 1000);
}); 