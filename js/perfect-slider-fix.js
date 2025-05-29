// PERFECT 3-CARD SLIDER FIX - CRASH SAFE VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Perfect Slider Fix Loading...');
    
    // Wait for Webflow to initialize
    setTimeout(function() {
        initPerfectSlider();
    }, 500);
});

function initPerfectSlider() {
    const slider = document.querySelector('.slider01_comp');
    const sliderMask = document.querySelector('.slider01_mask');
    const sliderList = document.querySelector('.w-slider-nav, .slider01_list');
    const slides = document.querySelectorAll('.slider01_slide');
    const dots = document.querySelectorAll('.w-slider-dot');
    
    if (!slider || !sliderList || slides.length === 0) {
        console.log('❌ Slider elements not found - skipping slider fix');
        return;
    }
    
    console.log(`📊 Found ${slides.length} slides`);
    
    // Prevent multiple initializations
    if (slider.dataset.sliderFixed === 'true') {
        console.log('⚠️ Slider already initialized - skipping');
        return;
    }
    slider.dataset.sliderFixed = 'true';
    
    let isUpdating = false; // Prevent infinite loops
    let resizeTimeout = null; // Debounce resize events
    
    // Force exact layout with error handling
    function setupPerfectLayout() {
        if (isUpdating) return; // Prevent recursive calls
        isUpdating = true;
        
        try {
            // Container setup
            slider.style.cssText = `
                width: 100% !important;
                max-width: 1200px !important;
                margin: 0 auto !important;
                overflow: hidden !important;
                position: relative !important;
            `;
            
            if (sliderMask) {
                sliderMask.style.cssText = `
                    width: 100% !important;
                    overflow: hidden !important;
                    position: relative !important;
                    height: auto !important;
                `;
            }
            
            // Slides container - make it wide enough for all slides
            if (sliderList && slides.length > 0) {
                sliderList.style.cssText = `
                    display: flex !important;
                    flex-direction: row !important;
                    transition: transform 0.5s ease !important;
                    align-items: stretch !important;
                    width: ${slides.length * 33.333}% !important;
                    transform: translateX(0) !important;
                    list-style: none !important;
                    padding: 0 !important;
                    margin: 0 !important;
                `;
            }
            
            // Each slide takes exactly 1/3 of viewport width
            if (slides.length > 0) {
                slides.forEach((slide, index) => {
                    const slideWidth = 100 / slides.length; // Each slide is 1/total of the container
                    
                    slide.style.cssText = `
                        flex: 0 0 ${slideWidth}% !important;
                        width: ${slideWidth}% !important;
                        margin: 0 !important;
                        padding: 0 10px !important;
                        box-sizing: border-box !important;
                        display: block !important;
                        position: relative !important;
                        direction: rtl !important;
                        min-height: 400px !important;
                        list-style: none !important;
                        transform: none !important;
                    `;
                    
                    // Fix mission cards
                    const missionCard = slide.querySelector('.about-us-mission-card');
                    if (missionCard) {
                        missionCard.style.cssText = `
                            direction: rtl !important;
                            text-align: right !important;
                            width: 100% !important;
                            height: 100% !important;
                            margin: 0 !important;
                            box-sizing: border-box !important;
                            min-height: 380px !important;
                            background: linear-gradient(135deg, rgba(88, 187, 79, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%) !important;
                            border: 2px solid rgba(88, 187, 79, 0.3) !important;
                            border-radius: 20px !important;
                            padding: 25px 20px !important;
                            position: relative !important;
                            overflow: hidden !important;
                            backdrop-filter: blur(15px) !important;
                            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3) !important;
                            display: flex !important;
                            flex-direction: column !important;
                            justify-content: flex-start !important;
                        `;
                    }
                });
            }
            
            console.log('✅ Perfect layout applied');
        } catch (error) {
            console.error('❌ Error in setupPerfectLayout:', error);
        } finally {
            isUpdating = false;
        }
    }
    
    // Custom pagination control with error handling
    function setupCustomPagination() {
        try {
            const totalSlides = slides.length;
            if (totalSlides === 0) return;
            
            const slidesPerView = getSlidesPerView();
            const totalPages = Math.ceil(totalSlides / slidesPerView);
            let currentPage = 0; // Start from first dot
            
            function getSlidesPerView() {
                try {
                    if (window.innerWidth <= 767) return 1; // Mobile: 1 slide
                    if (window.innerWidth <= 991) return 2; // Tablet: 2 slides  
                    return 3; // Desktop: 3 slides
                } catch (error) {
                    console.error('Error getting slides per view:', error);
                    return 3; // Default fallback
                }
            }
            
            function updateSliderPosition() {
                if (isUpdating || totalSlides === 0) return;
                
                try {
                    const slideWidth = 100 / totalSlides;
                    // For RTL, reverse the pagination logic - first dot shows last slides
                    const reverseIndex = (totalPages - 1) - currentPage;
                    const translateX = -(reverseIndex * slidesPerView * slideWidth);
                    
                    if (sliderList) {
                        sliderList.style.transform = `translateX(${translateX}%)`;
                    }
                    
                    // Update dots
                    if (dots.length > 0) {
                        dots.forEach((dot, index) => {
                            if (dot && dot.classList) {
                                dot.classList.toggle('w-active', index === currentPage);
                            }
                        });
                    }
                    
                    console.log(`📍 Moved to page ${currentPage + 1}/${totalPages}, showing slides from position ${reverseIndex}`);
                } catch (error) {
                    console.error('Error updating slider position:', error);
                }
            }
            
            // Override dot clicks with error handling
            if (dots.length > 0) {
                dots.forEach((dot, index) => {
                    if (dot) {
                        dot.addEventListener('click', function(e) {
                            try {
                                e.preventDefault();
                                e.stopPropagation();
                                
                                if (index < totalPages) {
                                    currentPage = index;
                                    updateSliderPosition();
                                }
                            } catch (error) {
                                console.error('Error handling dot click:', error);
                            }
                        });
                    }
                });
            }
            
            // Initial position
            updateSliderPosition();
            
            // Handle resize with debouncing to prevent crashes
            function handleResize() {
                if (resizeTimeout) {
                    clearTimeout(resizeTimeout);
                }
                
                resizeTimeout = setTimeout(function() {
                    try {
                        if (!isUpdating) {
                            setupPerfectLayout();
                            updateSliderPosition();
                        }
                    } catch (error) {
                        console.error('Error handling resize:', error);
                    }
                }, 250); // Debounce resize events
            }
            
            window.addEventListener('resize', handleResize);
            
            console.log(`🎮 Custom pagination setup: ${totalPages} pages, ${slidesPerView} slides per view`);
        } catch (error) {
            console.error('❌ Error in setupCustomPagination:', error);
        }
    }
    
    // Disable Webflow's slider behavior with error handling
    function disableWebflowSlider() {
        try {
            // Remove Webflow's slider event listeners
            const webflowSlider = slider.querySelector('.w-slider-mask');
            if (webflowSlider) {
                webflowSlider.style.pointerEvents = 'none';
            }
            
            // Simplified mutation observer - only watch for critical changes
            const observer = new MutationObserver(function(mutations) {
                if (isUpdating) return; // Don't trigger during our own updates
                
                let needsUpdate = false;
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && 
                        mutation.attributeName === 'style' &&
                        mutation.target.classList.contains('slider01_slide')) {
                        needsUpdate = true;
                    }
                });
                
                if (needsUpdate) {
                    // Debounce the update
                    setTimeout(() => {
                        if (!isUpdating) {
                            setupPerfectLayout();
                        }
                    }, 100);
                }
            });
            
            slides.forEach(slide => {
                if (slide) {
                    observer.observe(slide, { 
                        attributes: true, 
                        attributeFilter: ['style'],
                        subtree: false // Don't watch children
                    });
                }
            });
            
            console.log('🚫 Webflow slider behavior disabled');
        } catch (error) {
            console.error('❌ Error disabling Webflow slider:', error);
        }
    }
    
    // Initialize everything with error handling
    try {
        setupPerfectLayout();
        disableWebflowSlider();
        setupCustomPagination();
        
        console.log('🎉 Perfect 3-Card Slider initialized successfully!');
    } catch (error) {
        console.error('❌ Error initializing slider:', error);
    }
} 