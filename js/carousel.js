document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(function (carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = track.querySelectorAll('.carousel-slide');
        const indicators = carousel.parentElement.querySelector('.carousel-indicators');
        const dots = indicators ? indicators.querySelectorAll('span') : [];

        if (slides.length <= 1) return;

        let currentIndex = 0;
        let autoPlayInterval;
        const DELAY = 2000; 

        function updateDots() {
            dots.forEach(function (dot, i) {
                dot.style.background = i === currentIndex
                    ? 'rgba(255, 255, 255, 0.95)'
                    : 'rgba(255, 255, 255, 0.4)';
                dot.style.transform = i === currentIndex ? 'scale(1.2)' : 'scale(1)';
            });
        }

        function goToSlide(index) {
            const slideWidth = track.clientWidth;
            track.scrollTo({
                left: slideWidth * index,
                behavior: 'smooth'
            });
            currentIndex = index;
            updateDots();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, DELAY);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        let scrollTimeout;
        track.addEventListener('scroll', function () {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function () {
                const slideWidth = track.clientWidth;
                if (slideWidth > 0) {
                    const newIndex = Math.round(track.scrollLeft / slideWidth);
                    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < slides.length) {
                        currentIndex = newIndex;
                        updateDots();
                    }
                }
            }, 100);
        });

        track.addEventListener('mouseenter', stopAutoPlay);
        track.addEventListener('mouseleave', startAutoPlay);

        track.addEventListener('touchstart', stopAutoPlay, { passive: true });
        track.addEventListener('touchend', function () {
            setTimeout(startAutoPlay, 1000);
        }, { passive: true });

        dots.forEach(function (dot, i) {
            dot.style.cursor = 'pointer';
            dot.addEventListener('click', function () {
                stopAutoPlay();
                goToSlide(i);
                startAutoPlay();
            });
        });

        updateDots();
        startAutoPlay();
    });
});