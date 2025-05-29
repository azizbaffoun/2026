// Mobile Video Autoplay Fix
document.addEventListener('DOMContentLoaded', function() {
  // Mobile detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Find all videos on the page
    const videos = document.querySelectorAll('video');
    
    videos.forEach((video, index) => {
      // Add mobile-friendly attributes
      video.setAttribute('preload', 'auto');
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('x5-playsinline', 'true');
      
      // Force autoplay function
      function forceVideoPlay() {
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            // Video playing successfully
          }).catch(error => {
            // If autoplay fails, try to play on any user interaction
            const playOnInteraction = () => {
              video.play().then(() => {
                document.removeEventListener('touchstart', playOnInteraction);
                document.removeEventListener('click', playOnInteraction);
              }).catch(e => {
                // Play failed, silently handle error
              });
            };
            
            document.addEventListener('touchstart', playOnInteraction, { once: true });
            document.addEventListener('click', playOnInteraction, { once: true });
          });
        }
      }
      
      // Try to force play when video is ready
      video.addEventListener('loadedmetadata', function() {
        setTimeout(() => {
          forceVideoPlay();
        }, 100);
      });
      
      video.addEventListener('canplay', function() {
        if (video.paused) {
          forceVideoPlay();
        }
      });
      
      video.addEventListener('loadeddata', function() {
        if (video.paused) {
          forceVideoPlay();
        }
      });
      
      // Fallback: Try to play after a short delay
      setTimeout(() => {
        if (video.paused) {
          forceVideoPlay();
        }
      }, 1000 + (index * 500)); // Stagger attempts for multiple videos
    });
    
    // Global touch handler to start any paused videos
    document.addEventListener('touchstart', function() {
      videos.forEach((video) => {
        if (video.paused) {
          video.play().catch(() => {
            // Silently handle errors
          });
        }
      });
    }, { once: true });
  } else {
    console.log('Desktop device detected, no mobile video fixes needed');
  }
}); 