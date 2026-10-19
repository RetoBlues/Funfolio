const buttonHeight = 30;
const buttonWidth = 170;

// const maxWidth = window.innerWidth - (buttonWidth + 30); // added 30 for some slack
// const maxHeight = window.innerHeight - (buttonHeight + 110);

const msg = document.getElementById('message-bar');

let numClicks = 0;

// H O M E - P A G E ==============================================================================
// FOR THE BROWSE BUTTON--------------------------------------------------------
// window.addEventListener('DOMContentLoaded', () => { // technically dont need this bc of defer
const button = document.getElementById('browse-button');

button.addEventListener('click', () => {
    if (numClicks >= 6) {
        window.location.href = '../projects/projects.html';
        return; // stops
    }
    const headerHeight = 75;
    const maxWidth = window.innerWidth - (buttonWidth + 30);
    const maxHeight = window.innerHeight - (buttonHeight + 110);
    const topRange = maxHeight - headerHeight;

    button.style.top = (headerHeight + Math.floor(Math.random() * (topRange + 1))) + 'px';
    button.style.left = Math.floor(Math.random() * (maxWidth + 1)) + 'px';
    numClicks++;

    if (numClicks > 5) {
        button.classList.add('almost-caught');
    }
})
// })

// CONTACT ME--------------------------------------------------------------------
// Message textbox:
msg.addEventListener('input', () => {
    msg.style.height = 'auto';
    msg.style.height = msg.scrollHeight + 'px';
});
// Form - submit: Web3forms
const form = document.querySelector('.contactme-space');
const formStatus = document.querySelector('.form-status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    formStatus.textContent = 'Sending...';
    formStatus.className = 'form-status sending';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            form.reset();
            formStatus.textContent = 'Sent, hope to talk to you soon!';
            formStatus.className = 'form-status success';
        } else {
            formStatus.textContent = 'Something went wrong, try again.';
            formStatus.className = 'form-status error';
        }
    } catch (err) {
        formStatus.textContent = 'Network error, check connection and try again.';
        formStatus.className = 'form-status error';
    }
});
// ================================================================================================

