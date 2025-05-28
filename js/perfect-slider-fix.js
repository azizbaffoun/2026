// PERFECT 3-CARD SLIDER FIX
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
        console.error('❌ Slider elements not found');
        return;
    }
    
    console.log(`📊 Found ${slides.length} slides`);
    
    // Force exact layout
    function setupPerfectLayout() {
        // Container setup
        slider.style.cssText = `
            width: 100% !important;
            max-width: 1200px !important;
            margin: 0 auto !important;
            overflow: hidden !important;
            position: relative !important;
        `;
        
        sliderMask.style.cssText = `
            width: 100% !important;
            overflow: hidden !important;
            position: relative !important;
            height: auto !important;
        `;
        
        // Slides container - make it wide enough for all slides
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
        
        // Each slide takes exactly 1/3 of viewport width
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
        
        console.log('✅ Perfect layout applied');
    }
    
    // Custom pagination control
    function setupCustomPagination() {
        const totalSlides = slides.length;
        const slidesPerView = getSlidesPerView();
        const totalPages = Math.ceil(totalSlides / slidesPerView);
        let currentPage = 0; // Start from first dot
        
        function getSlidesPerView() {
            if (window.innerWidth <= 767) return 1;
            if (window.innerWidth <= 991) return 2;
            return 3;
        }
        
        function updateSliderPosition() {
            const slideWidth = 100 / totalSlides;
            // For RTL, reverse the pagination logic - first dot shows last slides
            const reverseIndex = (totalPages - 1) - currentPage;
            const translateX = -(reverseIndex * slidesPerView * slideWidth);
            
            sliderList.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('w-active', index === currentPage);
            });
            
            console.log(`📍 Moved to page ${currentPage + 1}/${totalPages}, showing slides from position ${reverseIndex}`);
        }
        
        // Override dot clicks
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (index < totalPages) {
                    currentPage = index;
                    updateSliderPosition();
                }
            });
        });
        
        // Initial position
        updateSliderPosition();
        
        // Handle resize
        window.addEventListener('resize', function() {
            setupPerfectLayout();
            updateSliderPosition();
        });
        
        console.log(`🎮 Custom pagination setup: ${totalPages} pages, ${slidesPerView} slides per view`);
    }
    
    // Disable Webflow's slider behavior
    function disableWebflowSlider() {
        // Remove Webflow's slider event listeners
        const webflowSlider = slider.querySelector('.w-slider-mask');
        if (webflowSlider) {
            webflowSlider.style.pointerEvents = 'none';
        }
        
        // Override any Webflow transforms
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const target = mutation.target;
                    if (target.classList.contains('slider01_slide')) {
                        // Prevent Webflow from changing slide styles
                        setTimeout(() => setupPerfectLayout(), 10);
                    }
                }
            });
        });
        
        slides.forEach(slide => {
            observer.observe(slide, { attributes: true, attributeFilter: ['style'] });
        });
        
        console.log('🚫 Webflow slider behavior disabled');
    }
    
    // Initialize everything
    setupPerfectLayout();
    disableWebflowSlider();
    setupCustomPagination();
    
    console.log('🎉 Perfect 3-Card Slider initialized successfully!');
} 