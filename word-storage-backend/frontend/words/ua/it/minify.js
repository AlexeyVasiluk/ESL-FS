const fs = require('fs');

// Зчитаємо початковий файл
let data = fs.readFileSync('it.js', 'utf8');

// Замінюємо всі переноси рядків на пробіли
data = data.replace(/\s*\n\s*/g, ' ');

// Опціонально: приберемо зайві пробіли
data = data.replace(/\s{2,}/g, ' ');

// Виводимо результат в консоль
console.log(data);
