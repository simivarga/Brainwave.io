document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        
        mousewheel: {
            invert: false,
        },
    });

    const slides = document.querySelectorAll('.swiper-slide');

    function updateActiveSlide() {
        // Get the slide at the top of the viewport
        const slideIndexAtTop = Array.from(slides).findIndex(slide => {
            const rect = slide.getBoundingClientRect();
            return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        });

        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            slide.classList.add('inactive');
        });

        if (slideIndexAtTop !== -1) {
            slides[slideIndexAtTop].classList.add('active');
            slides[slideIndexAtTop].classList.remove('inactive');
        }
    }

    // Update the active slide when the slide changes
    swiper.on('slideChangeTransitionEnd', () => {
        updateActiveSlide();
    });

    // Initialize the active slide state on load
    updateActiveSlide();

    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            swiper.slideToLoop(index);
            swiper.once('slideChangeTransitionEnd', () => {
                updateActiveSlide(); // Update the active slide after the transition ends
            });
        });
    });
});
