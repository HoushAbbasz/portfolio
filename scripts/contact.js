document.addEventListener('DOMContentLoaded', function() {
    
  // EmailJS configuration
    const EMAILJS_PUBLIC_KEY = 'bWvjbb51o1luPoUbo';
    const EMAILJS_SERVICE_ID = 'service_3w4kcdg';
    const EMAILJS_TEMPLATE_ID = 'template_wjtcc59';

    // initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('EmailJS initialized');

    // get form element
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        console.log('Contact form found');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            // get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            console.log('Form values:', { name, email, subject, message });
            
            // validate message length to be at least 10 chars
            if (message.length < 10) {
                showError('Message must be at least 10 characters long.');
                return;
            }
            
            // validate email format
            if (!isValidEmail(email)) {
                showError('Please enter a valid email address.');
                return;
            }
            
            // disable submit button to prevent double submission
            const submitBtn = contactForm.querySelector('.contact-form__button');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            const currentTime = new Date().toLocaleString();
            
            // prepare template parameters
            const templateParams = {
                subject: subject,
                name: name,
                time: currentTime,
                email: email,
                message: message
            };
            
            console.log('Sending email with params:', templateParams);
            
            // send email using EmailJS with your service and template IDs
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showSuccess('Message sent successfully! I\'ll get back to you soon.');
                    contactForm.reset();
                    // Remove character counter after reset
                    const counter = document.querySelector('.char-counter');
                    if (counter) counter.remove();
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    showError('Failed to send message. Please try again later.');
                })
                .finally(function() {
                    // re-enable submit button
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
        });
    } else {
        console.error('Contact form not found!');
    }

    // validates email 
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // show error message
    function showError(message) {
        console.log('Showing error:', message);
        removeAlerts();
        
        const alert = document.createElement('div');
        alert.className = 'form-alert form-alert--error';
        alert.textContent = message;
        
        const form = document.querySelector('.contact-form');
        form.insertBefore(alert, form.firstChild);
        
        // auto-remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    // show success message
    function showSuccess(message) {
        console.log('Showing success:', message);
        removeAlerts();
        
        const alert = document.createElement('div');
        alert.className = 'form-alert form-alert--success';
        alert.textContent = message;
        
        const form = document.querySelector('.contact-form');
        form.insertBefore(alert, form.firstChild);
        
        // auto-remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    // remove all alert messages
    function removeAlerts() {
        const alerts = document.querySelectorAll('.form-alert');
        alerts.forEach(alert => alert.remove());
    }

    // validation for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.addEventListener('input', function() {
            const charCount = this.value.trim().length;
            
            let counter = document.querySelector('.char-counter');
            
            if (!counter) {
                counter = document.createElement('div');
                counter.className = 'char-counter';
                this.parentElement.appendChild(counter);
            }
            
            if (charCount < 10) {
                counter.textContent = `${charCount}/10 characters (minimum)`;
                counter.style.color = '#e74c3c';
            } else {
                counter.textContent = `${charCount} characters`;
                counter.style.color = '#27ae60';
            }
        });
    }
});