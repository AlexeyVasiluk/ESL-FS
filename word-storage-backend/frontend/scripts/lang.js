
// frontend/scripts/lang.js

// 1) Словник перекладів
const translations = {
    ru: {
        menu_vocabulary:   'Словарь',
        menu_grammar:      'Грамматика',
        menu_listening:    'Аудирование',
        menu_lessons:      'Уроки',
        menu_job:          'Работа',
        clearProgress:     'Очистить прогресс',
        button_check:      'Проверить',
        button_endGame:    'Закончить игру',
        help:              'Помощь',
        wordsByTheme:      'Слова по темам'

        // ... інші ключі
    },
    uk: {
        menu_vocabulary:   'Словник',
        menu_grammar:      'Граматика',
        menu_listening:    'Аудіювання',
        menu_lessons:      'Уроки',
        menu_job:          'Робота',
        clearProgress:     'Очистити прогрес',
        button_check:      'Перевірити',
        button_endGame:    'Завершити гру',
        help:              'Допомога',
        wordsByTheme:      'Слова по тематикам'
        // ... інші ключі
    },
    es: {
        menu_vocabulary:   'Vocabulario',
        menu_grammar:      'Gramática',
        menu_listening:    'Comprensión auditiva',
        menu_lessons:      'Lecciones',
        menu_job:          'Trabajo',
        clearProgress:     'Borrar progreso',
        button_check:      'Comprobar',
        button_endGame:    'Terminar juego',
        help:              'Ayuda',
        wordsByTheme:      'Palabras por tema'
        // ... інші ключі
    }
};

// 2) Функції для читання/запису мови в localStorage
function getLang() {
    return localStorage.getItem('lang') || 'ru';
}
function setLang(lang) {
    localStorage.setItem('lang', lang);
}

// 3) Основна функція, що міняє текст на сторінці
function translatePage() {
    const lang = getLang();
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

// 4) Підключаємось до селектора і виводимо початкову мову
document.addEventListener('DOMContentLoaded', () => {
    const switcher = document.getElementById('language-switcher');
    // встановлюємо селектор у поточну мову
    switcher.value = getLang();
    switcher.addEventListener('change', e => {
        setLang(e.target.value);
        translatePage();
    });
    translatePage();
});
