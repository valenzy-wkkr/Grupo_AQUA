document.addEventListener('DOMContentLoaded', function () {
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

    // --- Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightboxBtn = document.querySelector('.close-lightbox');
    const lightboxPrevBtn = document.querySelector('.lightbox-btn.prev');
    const lightboxNextBtn = document.querySelector('.lightbox-btn.next');

    // We can use the existing 'slides' NodeList effectively

    function openLightbox(index) {
        if (!lightbox) return;

        lightbox.classList.add('active');
        updateLightboxImage(index);
        stopSlideShow(); // Stop main carousel
    }

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove('active');
        startSlideShow(); // Resume main carousel
    }

    function updateLightboxImage(index) {
        // Handle circular navigation for lightbox too
        let validIndex = index;
        if (index >= slides.length) validIndex = 0;
        else if (index < 0) validIndex = slides.length - 1;

        currentSlide = validIndex; // Sync with main carousel

        const sourceSlide = slides[currentSlide];
        const img = sourceSlide.querySelector('img');
        const caption = sourceSlide.querySelector('.carousel-caption');

        if (img) lightboxImg.src = img.src;
        if (caption) {
            // Clone caption to avoid moving it from original DOM or losing styles if we just copied text
            // But here we likely just want text. Let's start with HTML for formatting
            lightboxCaption.innerHTML = caption.innerHTML;
        } else {
            lightboxCaption.innerHTML = '';
        }
    }

    // Add click event to all carousel slides to open lightbox
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            // Open lightbox with the clicked slide's index
            // Note: The 'slides' NodeList might include the clone if we had an infinite loop implementation, 
            // but here it selects .carousel-slide which seems direct. 
            // However, checks if we need to account for specific clicked logic if active class matters.
            // We can just trust the index from forEach here.
            openLightbox(index);
        });
    });

    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', closeLightbox);
    }

    if (lightboxPrevBtn) {
        lightboxPrevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing if clicking button bubbles
            updateLightboxImage(currentSlide - 1);
        });
    }

    if (lightboxNextBtn) {
        lightboxNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateLightboxImage(currentSlide + 1);
        });
    }

    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') updateLightboxImage(currentSlide - 1);
        if (e.key === 'ArrowRight') updateLightboxImage(currentSlide + 1);
    });



    // Run initialization
    init();
});
