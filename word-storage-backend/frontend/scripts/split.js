const fs = require('fs');

// Читання вмісту JavaScript-файлу
fs.readFile('adverbs.js', 'utf8', (err, data) => {
    if (err) {
        console.error('Помилка при читанні файлу:', err);
        return;
    }

    // Оновлений регулярний вираз для пошуку масиву itdaily
    const arrayMatch = data.match(/export\s+const\s+adverbs\s*=\s*(\[[\s\S]*\]);/);
    if (!arrayMatch) {
        console.error('Не вдалося знайти масив adverbs у файлі.');
        return;
    }

    // Парсимо вміст масиву без використання eval
    const arrayContent = arrayMatch[1];
    let items;
    try {
        items = new Function(`return ${arrayContent}`)();
    } catch (e) {
        console.error('Помилка при розборі масиву:', e);
        return;
    }

    // Розбиваємо масив на частини по 50 елементів
    const chunkSize = 50;
    const totalChunks = Math.ceil(items.length / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
        const chunk = items.slice(i * chunkSize, (i + 1) * chunkSize);
        const chunkNumber = i + 1;

        // Готуємо вміст для нового файлу
        const fileContent = `export const adverbs_${chunkNumber} = ${JSON.stringify(chunk, null, 4)};`;

        const outputFileName = `adverbs_${chunkNumber}.js`;
        fs.writeFile(outputFileName, fileContent, 'utf8', (err) => {
            if (err) {
                console.error(`Помилка при записі файлу ${outputFileName}:`, err);
            } else {
                console.log(`Створено файл ${outputFileName}`);
            }
        });
    }
});
