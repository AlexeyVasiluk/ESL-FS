// frontend/scripts/lang.js
import ru from './locales/ru.js';
import uk from './locales/uk.js';
import es from './locales/es.js';

// 1) Збираємо переклади з окремих файлів
const translations = { ru, uk, es };

// 2) Читання/запис поточної мови
export function getLang() {
    return localStorage.getItem('lang') || 'ru';
}
export function setLang(lang) {
    localStorage.setItem('lang', lang);
}

// 3) Функція-помічник для отримання перекладу
export function t(key) {
    const lang = getLang();
    return translations[lang][key] || key;
}

// 4) Переклад сторінки
function translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        el.placeholder = t(key);
    });
}

// 6) Ініціалізація при завантаженні
window.addEventListener('DOMContentLoaded', () => {
    const switcher = document.getElementById('language-switcher');
    if (switcher) {
        // відновлюємо попередній вибір
        switcher.value = getLang();
        switcher.addEventListener('change', e => {
            setLang(e.target.value);
            translatePage();
        });
    }
    translatePage();
});