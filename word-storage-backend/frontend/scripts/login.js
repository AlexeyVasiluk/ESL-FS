const formTitle = document.getElementById('form-title');
const authForm = document.getElementById('auth-form');
const usernameField = document.getElementById('username-field');
const submitBtn = document.getElementById('submit-btn');
const toggleBtn = document.getElementById('toggle-btn');
const messageP = document.getElementById('message');

let isRegister = true; // за замовчуванням режим реєстрації

// Перемикання між режимами реєстрації та логіну
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
        toggleBtn.textContent = "Немає акаунта? Зареєструйтесь тут";
    }
    messageP.textContent = '';
});

// Обробка відправки форми (реєстрація/логін)
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
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        if (!response.ok) {
            const errorMsg = resData.error || (resData.errors && resData.errors[0].msg) || 'Щось пішло не так';
            throw new Error(errorMsg);
        }
        // Сервер встановлює токен у cookie (HttpOnly), тому зберігати його в localStorage не потрібно
        messageP.style.color = 'green';
        messageP.textContent = 'Успішно! Ви увійшли в систему.';
        // Перенаправляємо користувача на захищену сторінку
        window.location.href = '/vocabulary';
    } catch (error) {
        messageP.style.color = 'red';
        messageP.textContent = error.message;
    }
});
