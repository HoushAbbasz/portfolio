
const accordionButtons = document.querySelectorAll('.accordion__button');


accordionButtons.forEach(button => {
    // add event listener to each button
    button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        // get the corresponding content to the button
        const content = button.nextElementSibling;
        
        // close all other accordion items
        accordionButtons.forEach(otherButton => {
            if (otherButton !== button) {
                otherButton.classList.remove('accordion__button--active');
                otherButton.setAttribute('aria-expanded', 'false');
                const otherContent = otherButton.nextElementSibling;
                if (otherContent) {
                    otherContent.classList.remove('accordion__content--active');
                }
            }
        });
        
        //  if the button is expanded, close it
        if (isExpanded) {
            button.classList.remove('accordion__button--active');
            button.setAttribute('aria-expanded', 'false');
            if (content) {
                content.classList.remove('accordion__content--active');
            }
        // else, open it
        } else {
            button.classList.add('accordion__button--active');
            button.setAttribute('aria-expanded', 'true');
            if (content) {
                content.classList.add('accordion__content--active');
            }
        }
    });
});
