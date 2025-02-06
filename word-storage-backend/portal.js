const updateCategoryStats = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/category-stats', {
            method: 'GET',
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch category stats');
        const stats = await response.json();
        // Припустимо, що кожна кнопка категорії має ID, який відповідає назві категорії
        stats.forEach((stat) => {
            const category = stat._id; // наприклад, "verbs_moving"
            const guessedCount = stat.guessedCount;
            // Знайдемо кнопку для цієї категорії
            const button = document.getElementById(category);
            if (button) {
                // Наприклад, знайдемо або створимо елемент, де буде відображено статистику
                let statSpan = button.querySelector('.stats');
                if (!statSpan) {
                    statSpan = document.createElement('span');
                    statSpan.className = 'stats';
                    // Додамо цей елемент всередину кнопки (або поруч)
                    button.appendChild(statSpan);
                }
                statSpan.textContent = ` (Guessed: ${guessedCount})`;
            }
        });
    } catch (error) {
        console.error('Error updating category stats:', error);
    }
};

// Викликаємо updateCategoryStats при завантаженні сторінки
document.addEventListener('DOMContentLoaded', updateCategoryStats);
