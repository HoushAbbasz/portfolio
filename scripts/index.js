// wait for the page to fully load before running the slideshow code
document.addEventListener('DOMContentLoaded', initSlideshow);

function initSlideshow() {
  // find all elements with the class 'slideshow' on the page
  const slideshows = document.querySelectorAll('.slideshow');
  
  // loop through each slideshow 
  slideshows.forEach(slideshow => {

    // find all slide elements within this slideshow
    const slides = slideshow.querySelectorAll('.slideshow__slide');

    // find the next/previous buttons within this slideshow
    const prevBtn = slideshow.querySelector('.slideshow__btn--prev');
    const nextBtn = slideshow.querySelector('.slideshow__btn--next');

    // check if this slideshow should automatically advance
    const isAutomatic = slideshow.classList.contains('slideshow--auto');
    
    let currentSlide = 0;
    let intervalId = null;
    
    function showSlide(index) {
      slides[currentSlide].classList.remove('slideshow__slide--active');
      currentSlide = index;

      // if the index goes past the last slide, loop back to the first
      if (currentSlide >= slides.length) currentSlide = 0;
      // if the index goes before the first slide, loop to the last
      if (currentSlide < 0) currentSlide = slides.length - 1;

      slides[currentSlide].classList.add('slideshow__slide--active');
    }
    
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
    
    function showPrevSlide() {
      showSlide(currentSlide - 1);
    }
    
    // show next slide after 5 seconds
    if (isAutomatic) {
      intervalId = setInterval(showNextSlide, 5000); 
    }
    
    // if a next button exists, set up its click handler
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showNextSlide();
      });
    }
    
    // if a previous button exists, set up its click handler
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showPrevSlide();
      });
    }
  });
}