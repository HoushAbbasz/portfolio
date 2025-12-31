// select elements 
const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.nav__link');

// toggle menu function
function toggleMenu() {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    
    navToggle.classList.toggle('nav__toggle--active');
    navList.classList.toggle('nav__list--active');
    overlay.classList.toggle('overlay--active');
    
    // update ARIA attribute
    navToggle.setAttribute('aria-expanded', !isExpanded);
    overlay.setAttribute('aria-hidden', isExpanded);
}

// close menu function
function closeMenu() {
    navToggle.classList.remove('nav__toggle--active');
    navList.classList.remove('nav__list--active');
    overlay.classList.remove('overlay--active');
    
    // reset ARIA attributes
    navToggle.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
}

// event listeners
navToggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

// close menu when clicking on navigation links
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});
