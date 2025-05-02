import { t, translatePage  } from './lang.js';

let isRegister = false;

document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    setupAuthForm();
});

function updateFormTexts() {
    const formTitle  = document.getElementById('form-title');
    const submitBtn  = document.getElementById('submit-btn');
    const toggleBtn  = document.getElementById('toggle-btn');

    if (isRegister) {
        formTitle.dataset.i18n       = 'registerFormTitle';
        submitBtn.dataset.i18n       = 'registerBtn';
        toggleBtn.dataset.i18n       = 'toggleToLoginBtn';
    } else {
        formTitle.dataset.i18n       = 'loginFormTitle';
        submitBtn.dataset.i18n       = 'loginBtn';
        toggleBtn.dataset.i18n       = 'toggleToRegisterBtn';
    }
    translatePage();
}

function setupAuthForm() {
    updateFormTexts();
    const formTitle = document.getElementById('form-title');
    const authForm = document.getElementById('auth-form');
    const usernameField = document.getElementById('username-field');
    const submitBtn = document.getElementById('submit-btn');
    const toggleBtn = document.getElementById('toggle-btn');
    const messageP = document.getElementById('message');

    usernameField.style.display = 'none';
    messageP.textContent        = '';

    toggleBtn.addEventListener('click', () => {
        isRegister = !isRegister;
        updateFormTexts();
        messageP.textContent = '';
    });

    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageP.textContent = '';
        messageP.style.color = 'black';

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        let url = isRegister ? '/api/auth/register' : '/api/auth/login';
        let data = { email, password };

        if (isRegister) {
            const username = document.getElementById('username').value;
            data.username = username;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            const resData = await response.json();
            if (!response.ok) {
                const errorMsg =
                    resData.error || (resData.errors && resData.errors[0].msg) || t('loginErrorDefault');
                throw new Error(errorMsg);
            }

            messageP.style.color = 'green';
            messageP.textContent   = t('loginSuccessMessage');
            window.location.href = '/vocabulary';

        } catch (error) {
            messageP.style.color = 'red';
            messageP.textContent = error.message;
        }
    });
}

function checkAuthStatus() {
    if (document.cookie && document.cookie.indexOf('token=') !== -1) {
        if (window.location.pathname === '/login.html') {
            window.location.href = '/vocabulary';
        } else {
            displayLogoutButton();
        }
    } else {
        showLoginForm();
    }
}

function displayLogoutButton() {
    const authForm = document.getElementById('auth-form');
    if (authForm) authForm.style.display = 'none';

    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) toggleBtn.style.display = 'none';

    const formTitle = document.getElementById('form-title');
    if (formTitle) formTitle.textContent = t('loginWelcome');

    const messageP = document.getElementById('message');
    if (messageP) messageP.textContent = '';
}

function showLoginForm() {
    const authForm = document.getElementById('auth-form');
    if (authForm) authForm.style.display = 'block';

    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) toggleBtn.style.display = 'block';

    const formTitle = document.getElementById('form-title');
    if (formTitle) formTitle.textContent = t('loginFormTitle');

    const messageP = document.getElementById('message');
    if (messageP) messageP.textContent = '';

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.remove();
}