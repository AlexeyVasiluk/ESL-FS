import ru from './locales/ru.js';
import uk from './locales/uk.js';
import es from './locales/es.js';

const translations = { ru, uk, es };
export function getLang() {
    return localStorage.getItem('lang') || 'ru';
}

export function setLang(lang) {
    localStorage.setItem('lang', lang);
}

export function t(key) {
    const lang = getLang();
    return translations[lang][key] || key;
}

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

window.addEventListener('DOMContentLoaded', () => {
    const switcher = document.getElementById('language-switcher');
    if (switcher) {
        switcher.value = getLang();
        switcher.addEventListener('change', e => {
            setLang(e.target.value);
            translatePage();
        });
    }
    translatePage();
});