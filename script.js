// Collin Williams
// JavaScript interaction features for the course website 

// Theme button: changes the page between the normal and dark themes.
const themeButton = document.getElementById('theme-toggle');

if (themeButton) {
    themeButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            themeButton.textContent = 'Use Light Theme';
        } else {
            themeButton.textContent = 'Use Dark Theme';
        }
    });
}

// Hobby button: shows or hides extra content on the hobbies page.
const hobbyButton = document.getElementById('hobby-toggle');
const hobbyDetails = document.getElementById('hobby-details');

if (hobbyButton && hobbyDetails) {
    hobbyButton.addEventListener('click', function () {
        hobbyDetails.classList.toggle('hidden');

        if (hobbyDetails.classList.contains('hidden')) {
            hobbyButton.textContent = 'Show More About My Hobbies';
            hobbyButton.setAttribute('aria-expanded', 'false');
        } else {
            hobbyButton.textContent = 'Hide Extra Hobby Information';
            hobbyButton.setAttribute('aria-expanded', 'true');
        }
    });
}

// Image button: switches between the desktop and server setup photos.
const setupImage = document.getElementById('setup-image');
const imageButton = document.getElementById('image-toggle');
const imageCaption = document.getElementById('image-caption');

if (setupImage && imageButton && imageCaption) {
    let showingDesktop = true;

    imageButton.addEventListener('click', function () {
        if (showingDesktop) {
            setupImage.src = 'Server Setup.jpg';
            setupImage.alt = 'My home server and 3D printer setup';
            imageCaption.textContent = 'My server and 3D printer setup';
            imageButton.textContent = 'Show Desktop Setup';
        } else {
            setupImage.src = 'Setup.jpg';
            setupImage.alt = 'My current computer setup with three monitors';
            imageCaption.textContent = 'My current desktop setup';
            imageButton.textContent = 'Show Server Setup';
        }

        showingDesktop = !showingDesktop;
    });
}

// Contact form: checks required fields and displays a validation message.
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const formMessage = document.getElementById('form-message');

if (contactForm && nameInput && emailInput && subjectInput && messageInput && formMessage) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        formMessage.classList.remove('error-message', 'success-message');

        if (nameInput.value.trim() === '') {
            formMessage.textContent = 'Please enter your name.';
            formMessage.classList.add('error-message');
            nameInput.focus();
        } else if (emailInput.value.trim() === '' || !emailInput.checkValidity()) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.classList.add('error-message');
            emailInput.focus();
        } else if (subjectInput.value.trim() === '') {
            formMessage.textContent = 'Please enter a subject.';
            formMessage.classList.add('error-message');
            subjectInput.focus();
        } else if (messageInput.value.trim() === '') {
            formMessage.textContent = 'Please enter a message.';
            formMessage.classList.add('error-message');
            messageInput.focus();
        } else {
            formMessage.textContent = 'Thank you. Your message passed validation.';
            formMessage.classList.add('success-message');
            contactForm.reset();
        }
    });
}
