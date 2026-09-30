document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel-track');
    
    carousels.forEach(function(track) {
        const slides = track.querySelectorAll('.carousel-slide');
        if (slides.length <= 1) return;
        
        let currentIndex = 0;
        let autoPlayInterval;
        
        function goToSlide(index) {
            const slideWidth = track.clientWidth;
            track.scrollTo({
                left: slideWidth * index,
                behavior: 'smooth'
            });
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        }
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 4000); 
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        track.addEventListener('scroll', function() {
            const slideWidth = track.clientWidth;
            currentIndex = Math.round(track.scrollLeft / slideWidth);
        });
        
        track.addEventListener('mouseenter', stopAutoPlay);
        track.addEventListener('mouseleave', startAutoPlay);
        track.addEventListener('touchstart', stopAutoPlay);
        track.addEventListener('touchend', function() {
            setTimeout(startAutoPlay, 2000);
        });
        startAutoPlay();
    });
});