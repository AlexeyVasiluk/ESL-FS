let isRegister = false;

document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    setupAuthForm();
});

function setupAuthForm() {
    const formTitle = document.getElementById('form-title');
    const authForm = document.getElementById('auth-form');
    const usernameField = document.getElementById('username-field');
    const submitBtn = document.getElementById('submit-btn');
    const toggleBtn = document.getElementById('toggle-btn');
    const messageP = document.getElementById('message');

    formTitle.textContent = 'Login';
    submitBtn.textContent = 'Login';
    usernameField.style.display = 'none';
    toggleBtn.textContent = 'Register';
    messageP.textContent = '';

    toggleBtn.addEventListener('click', () => {
        isRegister = !isRegister;
        if (isRegister) {
            formTitle.textContent = 'Register';
            submitBtn.textContent = 'Register';
            usernameField.style.display = 'block';
            toggleBtn.textContent = 'Login';
        } else {
            formTitle.textContent = 'Login';
            submitBtn.textContent = 'Login';
            usernameField.style.display = 'none';
            toggleBtn.textContent = 'Register';
        }
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
                    resData.error || (resData.errors && resData.errors[0].msg) || 'Щось пішло не так';
                throw new Error(errorMsg);
            }

            messageP.style.color = 'green';
            messageP.textContent = 'Успішно! Ви увійшли в систему.';
            window.location.href = '/vocabulary';

        } catch (error) {
            messageP.style.color = 'red';
            messageP.textContent = error.message;
        }
    });
}

function checkAuthStatus() {
    console.log('checkAuthStatus викликано');
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
    if (formTitle) formTitle.textContent = 'Вітаємо!';

    const messageP = document.getElementById('message');
    if (messageP) messageP.textContent = '';
}

function showLoginForm() {
    const authForm = document.getElementById('auth-form');
    if (authForm) authForm.style.display = 'block';

    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) toggleBtn.style.display = 'block';

    const formTitle = document.getElementById('form-title');
    if (formTitle) formTitle.textContent = 'Login';

    const messageP = document.getElementById('message');
    if (messageP) messageP.textContent = '';

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.remove();
}
