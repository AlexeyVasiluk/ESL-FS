// frontend/scripts/login.js
import { t } from './lang.js';

let isRegister = false;

document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    setupAuthForm();
});

function setupAuthForm() {
    const formTitle     = document.getElementById('form-title');
    const authForm      = document.getElementById('auth-form');
    const usernameField = document.getElementById('username-field');
    const submitBtn     = document.getElementById('submit-btn');
    const toggleBtn     = document.getElementById('toggle-btn');
    const messageP      = document.getElementById('message');

    // Ініціалізуємо тексти
    formTitle.textContent       = t('loginLoginFormTitle');
    submitBtn.textContent       = t('loginLoginBtn');
    usernameField.style.display = 'none';
    toggleBtn.textContent       = t('loginToggleToRegister');
    messageP.textContent        = '';

    toggleBtn.addEventListener('click', () => {
        isRegister = !isRegister;
        if (isRegister) {
            formTitle.textContent       = t('loginRegisterFormTitle');
            submitBtn.textContent       = t('loginRegisterBtn');
            usernameField.style.display = 'block';
            toggleBtn.textContent       = t('loginToggleToLogin');
        } else {
            formTitle.textContent       = t('loginLoginFormTitle');
            submitBtn.textContent       = t('loginLoginBtn');
            usernameField.style.display = 'none';
            toggleBtn.textContent       = t('loginToggleToRegister');
        }
        messageP.textContent = '';
    });

    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageP.textContent = '';
        messageP.style.color = 'black';

        const email    = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const url      = isRegister ? '/api/auth/register' : '/api/auth/login';
        const data     = { email, password };

        if (isRegister) {
            data.username = document.getElementById('username').value;
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
                const errorMsg = resData.error
                    || (resData.errors && resData.errors[0].msg)
                    || t('loginErrorDefault');
                throw new Error(errorMsg);
            }

            messageP.style.color   = 'green';
            messageP.textContent   = t('loginSuccessMessage');
            setTimeout(() => {
                window.location.href = '/vocabulary.html';
            }, 50);

        } catch (error) {
            messageP.style.color   = 'red';
            messageP.textContent   = error.message;
        }
    });
}

async function checkAuthStatus() {
    try {
        const res = await fetch('/api/auth/status', { credentials: 'include' });
        if (res.ok) {
            // Якщо вже авторизовані на сторінці логіну — переходимо до словника
            if (window.location.pathname.endsWith('login.html')) {
                window.location.href = '/vocabulary.html';
            } else {
                displayLogoutButton();
            }
        } else {
            showLoginForm();
        }
    } catch {
        showLoginForm();
    }
}

function displayLogoutButton() {
    const authForm   = document.getElementById('auth-form');
    const toggleBtn  = document.getElementById('toggle-btn');
    const formTitle  = document.getElementById('form-title');
    const messageP   = document.getElementById('message');

    if (authForm)   authForm.style.display   = 'none';
    if (toggleBtn)  toggleBtn.style.display  = 'none';
    if (formTitle)  formTitle.textContent    = t('loginWelcome');
    if (messageP)   messageP.textContent     = '';
}

function showLoginForm() {
    const authForm   = document.getElementById('auth-form');
    const toggleBtn  = document.getElementById('toggle-btn');
    const formTitle  = document.getElementById('form-title');
    const messageP   = document.getElementById('message');

    if (authForm)   authForm.style.display   = 'block';
    if (toggleBtn)  toggleBtn.style.display  = 'block';
    if (formTitle)  formTitle.textContent    = t('loginLoginFormTitle');
    if (messageP)   messageP.textContent     = '';

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn)  logoutBtn.remove();
}
