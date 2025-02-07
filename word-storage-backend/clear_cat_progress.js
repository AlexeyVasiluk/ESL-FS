// Нижче наведено відрефакторену версію клієнтської функції, яка очищує прогрес користувача лише для певної категорії. Для цього функція приймає категорію як аргумент і надсилає PATCH‑запит із зазначенням категорії в тілі запиту. Також показано, як прив'язати обробник події до кнопок, які містять атрибут із ID категорії.
//
// 1. Функція очищення прогресу за категорією

const clearUserProgressByCategory = async (category) => {
    console.log(`Clearing progress for category: ${category}`);
    try {
        const response = await fetch('http://localhost:5000/api/clear-progress', {
            method: 'PATCH',
            credentials: 'include', // надсилаємо куки для авторизації
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category }) // передаємо категорію як частину тіла запиту
        });
        if (!response.ok) {
            throw new Error(`Failed to clear progress: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.message, 'Modified count:', data.modifiedCount);
        // Оновлюємо UI, наприклад, статистику категорій
        updateCategoryStats();
    } catch (error) {
        console.error('Error clearing user progress by category:', error);
    }
};
// 2. Прив’язка обробників подій до кнопок для очищення за категоріями
// Припустимо, що у вас для кожної категорії на сторінці є кнопка очищення, яка має клас clear-progress-category і містить атрибут data-category, що містить ID категорії. Наприклад, HTML-код кнопки може виглядати так:

<button class="clear-progress-category" data-category="verbs_moving">Clear Progress</button>

// Тоді прив’язку можна реалізувати таким чином:

const clearCategoryButtons = document.querySelectorAll('.clear-progress-category');
clearCategoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const category = button.dataset.category; // отримуємо значення data-category
        clearUserProgressByCategory(category);
    });
});

// 3. Серверний маршрут
// Щоб цей функціонал працював, на сервері потрібно змінити маршрут очищення, щоб він враховував категорію. Наприклад, замість оновлення всіх записів для поточного користувача, зробіть фільтрацію за категорією:

// Захищений маршрут для очищення прогресу користувача за категорією
app.patch('/api/clear-progress', auth, async (req, res) => {
    try {
        const { category } = req.body; // очікуємо, що категорія передається в тілі запиту
        if (!category) {
            return res.status(400).json({ error: 'Category is required' });
        }
        console.log("Clear progress route hit. User ID:", req.user.id, "Category:", category);
        const result = await UserProgress.updateMany(
            { userId: req.user.id, category: category, status: "guessed" },
            { $set: { status: "not_guessed" } } // або встановіть "false" за потреби
        );
        console.log("Clear progress result:", result);
        res.json({ message: 'Your progress for the category has been cleared', modifiedCount: result.modifiedCount });
    } catch (error) {
        console.error('Error clearing user progress:', error);
        res.status(500).json({ error: 'Failed to clear user progress' });
    }
});

// Примітка:
//     Для цього маршруту важливо, щоб у документах UserProgress також зберігалося поле category (тобто, під час збереження прогресу при відгадуванні слова ви повинні записувати відповідну категорію). Якщо його немає, потрібно додати це поле при створенні записів.
//
//     Підсумок
// Клієнтський код:
//     Функція clearUserProgressByCategory(category) надсилає PATCH‑запит із передачею категорії.
//     Кнопки для очищення прив’язані через клас і data-атрибут, що дозволяє визначити категорію.
//
//     Серверний код:
//     Маршрут /api/clear-progress фільтрує записи за userId, category і статусом "guessed", і встановлює статус у "not_guessed" (або видаляє, якщо бажаєте).
//
// Це дозволить користувачу очищати прогрес лише для конкретної категорії, замість того, щоб очищати увесь прогрес.