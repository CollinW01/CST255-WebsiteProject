// Collin Williams

// Changes the page between the normal and dark themes.
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

// Shows or hides extra content on the hobbies page.
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

// Switches between the desktop and server setup photos.
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
