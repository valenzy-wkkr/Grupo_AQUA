document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const counterElement = document.querySelector('.slide-counter');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    let slideTimer;

    // Initialize
    function init() {
        // Show first slide
        showSlide(currentSlide);
        // Start automatic slideshow
        startSlideShow();
    }

    function updateCounter() {
        if (counterElement) {
            counterElement.textContent = `${currentSlide + 1}/${slides.length}`;
        }
    }

    function showSlide(n) {
        // Reset all slides
        slides.forEach(slide => slide.classList.remove('active'));

        // Handle circular navigation
        if (n >= slides.length) currentSlide = 0;
        else if (n < 0) currentSlide = slides.length - 1;
        else currentSlide = n;

        // Activate new slide
        slides[currentSlide].classList.add('active');
        
        // Update counter
        updateCounter();
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        stopSlideShow(); // Clear existing timer
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    function stopSlideShow() {
        if (slideTimer) {
            clearInterval(slideTimer);
        }
    }

    // Event Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startSlideShow(); // Reset timer on manual interaction
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startSlideShow(); // Reset timer on manual interaction
        });
    }

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopSlideShow);
        carouselContainer.addEventListener('mouseleave', startSlideShow);
    }

    // Run initialization
    init();
});
