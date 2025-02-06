// Оголошуємо глобальну змінну, за замовчуванням режим логіну
let isRegister = false; // false = логін, true = реєстрація

document.addEventListener('DOMContentLoaded', () => {
    // Простенька перевірка наявності куки "token"
    checkAuthStatus();
    // Налаштовуємо форму логіну/реєстрації
    setupAuthForm();
});

function setupAuthForm() {
    const formTitle = document.getElementById('form-title');
    const authForm = document.getElementById('auth-form');
    const usernameField = document.getElementById('username-field');
    const submitBtn = document.getElementById('submit-btn');
    const toggleBtn = document.getElementById('toggle-btn');
    const messageP = document.getElementById('message');

    // Встановлюємо початковий стан (режим логіну)
    formTitle.textContent = 'Логін';
    submitBtn.textContent = 'Увійти';
    usernameField.style.display = 'none';
    toggleBtn.textContent = 'Немає акаунта? Зареєструйтесь тут';
    messageP.textContent = '';

    // Обробка натискання кнопки перемикання режимів
    toggleBtn.addEventListener('click', () => {
        isRegister = !isRegister;
        if (isRegister) {
            formTitle.textContent = 'Реєстрація';
            submitBtn.textContent = 'Зареєструватися';
            usernameField.style.display = 'block';
            toggleBtn.textContent = 'Вже маєте акаунт? Увійдіть тут';
        } else {
            formTitle.textContent = 'Логін';
            submitBtn.textContent = 'Увійти';
            usernameField.style.display = 'none';
            toggleBtn.textContent = 'Немає акаунта? Зареєструйтесь тут';
        }
        messageP.textContent = '';
    });

    // Обробка відправки форми (логін/реєстрація)
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageP.textContent = '';
        messageP.style.color = 'black';

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        let url = '';
        let data = { email, password };

        if (isRegister) {
            const username = document.getElementById('username').value;
            data.username = username;
            url = 'http://localhost:5000/api/auth/register';
        } else {
            url = 'http://localhost:5000/api/auth/login';
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include' // надсилання cookie
            });
            const resData = await response.json();
            if (!response.ok) {
                const errorMsg =
                    resData.error || (resData.errors && resData.errors[0].msg) || 'Щось пішло не так';
                throw new Error(errorMsg);
            }
            // Після успішного логіну/реєстрації сервер встановлює куку "token"
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
    // Простенька перевірка: шукаємо "token=" у document.cookie
    if (document.cookie && document.cookie.indexOf('token=') !== -1) {
        // Якщо кука є, вважаємо, що користувач авторизований
        if (window.location.pathname === '/login.html') {
            window.location.href = '/vocabulary';
        } else {
            displayLogoutButton();
        }
    } else {
        // Якщо куки немає, показуємо форму логіну
        showLoginForm();
    }
}

function displayLogoutButton() {
    // Приховуємо форму логіну
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.style.display = 'none';
    }
    // Приховуємо кнопку перемикання режимів
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.style.display = 'none';
    }
    // Змінюємо заголовок
    const formTitle = document.getElementById('form-title');
    if (formTitle) {
        formTitle.textContent = 'Вітаємо!';
    }
    // Очищаємо повідомлення
    const messageP = document.getElementById('message');
    if (messageP) {
        messageP.textContent = '';
    }





}

function showLoginForm() {
    // Відображаємо форму логіну
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.style.display = 'block';
    }
    // Відображаємо кнопку перемикання режимів
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.style.display = 'block';
    }
    // Встановлюємо заголовок форми як "Логін" (оскільки за замовчуванням ми використовуємо логін)
    const formTitle = document.getElementById('form-title');
    if (formTitle) {
        formTitle.textContent = 'Логін';
    }
    // Очищаємо повідомлення
    const messageP = document.getElementById('message');
    if (messageP) {
        messageP.textContent = '';
    }
    // Видаляємо кнопку "Вийти", якщо вона існує
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.remove();
    }
}
