// Collin Williams
// JavaScript interaction features for the course website

// Theme button: changes the page between the normal and dark themes.
// The user's theme choice is saved so it stays consistent across all pages.
const themeButton = document.getElementById('theme-toggle');

function updateThemeButton() {
    if (!themeButton) {
        return;
    }

    const darkThemeOn = document.body.classList.contains('dark-theme');

    if (darkThemeOn) {
        themeButton.textContent = 'Use Light Theme';
        themeButton.setAttribute('aria-pressed', 'true');
    } else {
        themeButton.textContent = 'Use Dark Theme';
        themeButton.setAttribute('aria-pressed', 'false');
    }
}

// Apply the saved theme when a page loads.
const savedTheme = localStorage.getItem('preferredTheme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

updateThemeButton();

if (themeButton) {
    themeButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('preferredTheme', 'dark');
        } else {
            localStorage.setItem('preferredTheme', 'light');
        }

        updateThemeButton();
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

// Contact form variables.
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const formMessage = document.getElementById('form-message');
const messageCounter = document.getElementById('message-counter');
const clearFormButton = document.getElementById('clear-form');
const contactDraftKey = 'contactFormDraft';

// Updates the message character counter on the contact form.
function updateMessageCounter() {
    if (!messageInput || !messageCounter) {
        return;
    }

    const maxLength = messageInput.maxLength;
    const currentLength = messageInput.value.length;
    messageCounter.textContent = currentLength + ' / ' + maxLength + ' characters';
}

// Saves unfinished contact form values in the browser.
function saveContactDraft() {
    if (!contactForm || !nameInput || !emailInput || !subjectInput || !messageInput) {
        return;
    }

    const draft = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value
    };

    localStorage.setItem(contactDraftKey, JSON.stringify(draft));
}

// Restores an unfinished contact form after a page refresh.
function restoreContactDraft() {
    if (!contactForm || !nameInput || !emailInput || !subjectInput || !messageInput) {
        return;
    }

    const savedDraft = localStorage.getItem(contactDraftKey);

    if (!savedDraft) {
        updateMessageCounter();
        return;
    }

    try {
        const draft = JSON.parse(savedDraft);
        nameInput.value = draft.name || '';
        emailInput.value = draft.email || '';
        subjectInput.value = draft.subject || '';
        messageInput.value = draft.message || '';
    } catch (error) {
        localStorage.removeItem(contactDraftKey);
    }

    updateMessageCounter();
}

if (contactForm && nameInput && emailInput && subjectInput && messageInput && formMessage) {
    restoreContactDraft();

    // Save the draft whenever the user changes a form field.
    contactForm.addEventListener('input', function () {
        saveContactDraft();
        updateMessageCounter();
    });

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
            localStorage.removeItem(contactDraftKey);
            updateMessageCounter();
        }
    });
}

// Clear button: removes the current form values and the saved browser draft.
if (clearFormButton && contactForm && formMessage) {
    clearFormButton.addEventListener('click', function () {
        contactForm.reset();
        localStorage.removeItem(contactDraftKey);
        formMessage.textContent = 'Form cleared.';
        formMessage.classList.remove('error-message');
        formMessage.classList.add('success-message');
        updateMessageCounter();

        if (nameInput) {
            nameInput.focus();
        }
    });
}
 
// Back-to-top button: appears after the user scrolls down the page.
const backToTopButton = document.createElement('button');
backToTopButton.type = 'button';
backToTopButton.className = 'back-to-top';
backToTopButton.textContent = 'Back to Top';
backToTopButton.setAttribute('aria-label', 'Back to top of page');
document.body.appendChild(backToTopButton);

function updateBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}

window.addEventListener('scroll', updateBackToTopButton);
updateBackToTopButton();

backToTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
