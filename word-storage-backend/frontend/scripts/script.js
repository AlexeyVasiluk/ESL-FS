import { getLang, t } from './lang.js';

const wordElement = document.getElementById('word');
const guessInput = document.getElementById('guessInput');
const checkAnswerBtn = document.getElementById('checkAnswer');
const correctCountElement = document.getElementById('correct_numbers');
const wrongCountElement = document.getElementById('wrong_numbers');
const statsElement = document.getElementById('stats');
const totalQuestions = document.getElementById('total_question_number');
const wrapper = document.getElementById('wrapper');
const endGameBtn = document.getElementsByClassName('end-game');
const buttonsArray = document.querySelectorAll('.words-button');
const winModal = document.getElementById('winModal');
const rules = document.getElementById('rules');
const help = document.getElementsByClassName('help');
var content = document.getElementById('word');
let words = [];
let answerLog = [];
let correctCount = 0;
let wrongCount = 0;
let resultText = '';
let resultCount = '';
let randomIndex = 0;
let arrayId = '';
let attemptCount = 1;
correctCountElement.textContent = `0`;
wrongCountElement.textContent = `0`;

// UPDATE CATEGORY STATISTICS
const updateCategoryStats = async () => {
    console.log('updateCategoryStats');
    try {
        const response = await fetch('/api/category-stats', {
            method: 'GET',
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch category stats');
        const stats = await response.json();

        stats.forEach((stat) => {
            const category = stat._id; // Наприклад, "verbs_moving"
            const guessedCount = stat.guessed; // Кількість відгаданих слів для цього користувача
            const totalCount = stat.total;     // Загальна кількість слів у категорії

            // Знаходимо кнопку для цієї категорії
            const button = document.getElementById(category);
            if (button) {
                let statSpan = button.querySelector('.stats');
                if (!statSpan) {
                    statSpan = document.createElement('span');
                    statSpan.className = 'stats';
                    button.appendChild(statSpan);
                }
                statSpan.innerHTML = ` <span style="color: green;">${guessedCount}</span> / <span style="color: red;">${totalCount}</span>`;
            }
        });
    } catch (error) {
        console.error('Error updating category stats:', error);
    }
};

// SHOW CATEGORY STATISTICS
document.addEventListener('DOMContentLoaded', () => {
    updateCategoryStats();
});

// CATEGORY CHOOSING BY CLICKING ON CATEGORY NAME
buttonsArray.forEach((button) => {
    console.log('buttonsArray.forEach');
    button.addEventListener('click', async () => {
        const category = button.id;
        await chooseWordsArray(category);
    });
});

// GET WORDS from DB by CATEGORY
const fetchWords = async (category) => {
    console.log('fetchWords');
    try {
        const response = await fetch(`/api/words?category=${category}`);
        if (!response.ok) throw new Error('Failed to fetch words');
        return await response.json(); // API повертає тільки потрібні слова
    } catch (error) {
        console.error('Error fetching words:', error);
        return [];
    }
};

// GET USER PROGRESS from DB
const fetchProgress = async () => {
    console.log('fetchProgress');
    try {
        const response = await fetch('/api/progress', {
            method: 'GET',
            credentials: 'include' // надсилаємо куки для авторизації
        });
        if (!response.ok) throw new Error(`Failed to fetch progress: ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Invalid response format');
        return data;
    } catch (error) {
        console.error('Error fetching progress:', error);
        return [];
    }
};

// GET WORDS and PROGRESS from DB and PARSE WORDS to WORKING LIST
const chooseWordsArray = async (category) => {
    console.log('chooseWordsArray');
    try {
        // Завантажуємо ВСІ слова для заданої категорії
        const data = await fetchWords(category);
        console.log('CHOOSED WORDS:', data);

        // Завантажуємо дані прогресу користувача
        const progress = await fetchProgress();
        console.log('USER POGRESS:', progress);

        // Фільтруємо слова: виключаємо ті, які вже відгадані
        words = data.filter((word) => {
            const userWord = progress.find((p) => p.wordId === word._id);
            // Якщо запис існує і його статус "guessed", слово виключається
            return !(userWord && userWord.status === 'guessed');
        });

        console.log('WORDS (filtered):', words);

        arrayId = category;
        console.log('arrayId(category_name):', arrayId);
        startGame();
    } catch (error) {
        console.error('Error choosing words array:', error);
    }
};

// =====================================   GAME   LOGIC    =============================================================

// START GAME
const startGame = () => {
    statsElement.innerHTML = '';
    resultText = '';
    answerLog = [];
    correctCount = 0;
    wrongCount = 0;
    totalQuestions.textContent = `${words.length}`;
    wrapper.style.display = 'inline-block';
    guessInput.focus();
    showWord();
};

// CHOOSE RANDOM WORD from LIST
const showWord = () => {
    console.log('showWord');
    if (words.length > 0) {
        randomIndex = Math.floor(Math.random() * words.length);
        wordElement.textContent = words[randomIndex].word.toLowerCase();
        guessInput.style.backgroundColor = "";
        guessInput.value = '';
        guessInput.focus();
    }
};

// CHECK USER WORD INPUT
const checkGuess = (event) => {
    console.log('checkGuess');

    // Асинхронна функція перевірки відповіді
    const goCheck = async () => {
        const guess = guessInput.value.trim().toLowerCase();
        const currentWord = words[randomIndex];

        // Перевірка відповіді: чи співпадає введений текст з перекладом слова
        const isCorrect = guess === currentWord.translation.trim().toLowerCase();
        if (isCorrect) {
            guessInput.style.backgroundColor = "#5bc20f";
            correctCount++; // Збільшуємо лічильник правильних відповідей

            try {
                // Зберігаємо прогрес: слово відгадано
                await saveProgress(currentWord._id, true);
                console.log(`Updated word ${currentWord.word} in database`);
            } catch (error) {
                console.error('Error updating word in database:', error);
            }

            // Якщо відповідь правильна, видаляємо слово з масиву
            words = words.filter((word) => word._id !== currentWord._id);
        } else {
            // Якщо відповідь неправильна
            guessInput.style.backgroundColor = "#ff0000";
            wrongCount++; // Збільшуємо лічильник неправильних відповідей
            console.log('WRONG-COUNT-1', wrongCount);
        }

        // Додаємо запис відповіді в журнал
        answerLog.push({
            question: currentWord.word,
            answer: currentWord.translation,
            input: guess,
            correct: isCorrect,
            examples: currentWord.example,
        });

        // Оновлюємо результати гри (відображаємо кількість правильних і неправильних відповідей)
        showResults();

        // Оновлюємо статистику категорій
        await updateCategoryStats();

        // Якщо більше немає слів, завершуємо гру
        if (words.length === 0) {
            endGameSequence();
        }
    };

    // Виконати перевірку після натискання кнопки або Enter
    checkAnswerBtn.onclick = goCheck;

    // Якщо натиснуто Enter, запускаємо перевірку
    if (event.key === "Enter") {
        goCheck();
    }
};

// SAVE PROGRESS to DB
const saveProgress = async (wordId, guessed) => {
    console.log('saveProgress');
    try {
        // Надсилаємо POST-запит до маршруту /api/progress з даними про слово та його статусом
        const response = await fetch('/api/progress', {
            method: 'POST', // використовується POST для створення або оновлення запису
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                wordId,
                status: guessed ? 'guessed' : 'not_guessed'
            }),
            credentials: 'include' // надсилаємо куки для авторизації
        });

        if (!response.ok) {
            throw new Error(`Failed to update progress (${response.status})`);
        }

        const resData = await response.json();
        words = words.filter((word) => word._id !== wordId);
        totalQuestions.textContent = `${words.length}`;
    } catch (error) {
        console.error('Error saving progress:', error);
    }
};

// SHOW RESULTS
const showResults = () => {
    resultText = '';
    correctCountElement.textContent = `${correctCount}`;
    console.log('WRONG-COUNT-2', wrongCount);
    wrongCountElement.textcontent = `${wrongCount}`;

    for (let i = 0; i < answerLog.length; i++) {
        const answer = answerLog[i];
        const lastAnswer = answerLog[answerLog.length - 1];

        if (!lastAnswer.correct) {
            handleIncorrectAnswer(answer);
        } else {
            handleCorrectAnswer(answer);
        }
    }

    statsElement.innerHTML = resultText;
};

// RESULTS if CORRECT ANSWER
const handleIncorrectAnswer = (answer) => {
    console.log('handleIncorrectAnswer');
    resultText = `<div class="result-row">
        ${answer.question} - <span style='font-weight: bold;'>${answer.answer}</span><br>
        <div id="example-sentense-incorrect" class="hide">
            <span style="font-weight: bold;">${t('example')}</span> ${answer.examples}
        </div>
    </div>`;

    const wordObjects = createWordObjects(String(answer.examples));
    const shuffledWordObjects = shuffleWords(wordObjects);

    renderShuffledWords(shuffledWordObjects);
    attachEventListeners(shuffledWordObjects);
};

// RESULTS if NOT CORRECT ANSWER
const handleCorrectAnswer = (answer) => {
    console.log('handleCorrectAnswer');
    resultText = `<div class="result-row">
        ${answer.question} - <span style='font-weight: bold;'>${answer.answer}</span><br>
        <div id="example-sentense-correct">
            <span style="font-weight: bold;"> Example: </span>${answer.examples}
        </div>
    </div>`;
    emptyWordList();
};

// EMPTY WORDS INPUT FIELD
function emptyWordList() {
    console.log('emptyWordList');
    const elementsToDelete = document.querySelectorAll('.word-container');
    Array.from(elementsToDelete).forEach(element => element.remove());
    document.querySelectorAll('.example-text').forEach(element => {
        element.classList.remove('hide');
    });
    setTimeout(() => {
        showWord();
    }, 1000);
}


const createWordObjects = (inputString) => {
    console.log('createWordObjects');
    if (typeof inputString !== 'string') {
        console.error('Expected a string but got:', inputString);
        return []; // Повертаємо порожній масив, якщо дані некоректні
    }
    const words = inputString.split(' ');
    return words.map((word, index) => ({ word, index }));
};

const shuffleWords = (wordObjects) => {
    console.log('shuffleWords');
    return [...wordObjects].sort(() => Math.random() - 0.5);
};

const renderShuffledWords = (wordObjects) => {
    console.log('renderShuffledWords');
    const numberedWords = wordObjects.map(obj => `<span class="word-container" data-index="${obj.index}">${obj.word}</span>`);
    document.getElementById('originalWords').innerHTML = numberedWords.join(' ');
};

const attachEventListeners = (wordObjects) => {
    console.log('attachEventListeners');
    const wordContainers = document.querySelectorAll('.word-container');
    let clickedWords = [];

    wordContainers.forEach(wordContainer => {
        wordContainer.classList.remove('clicked');
        wordContainer.addEventListener('click', () => {
            const secondParent = document.getElementById('userVersion');
            const index = parseInt(wordContainer.getAttribute('data-index'), 10);

            if (!isNaN(index) && !clickedWords.includes(index)) {
                clickedWords.push(index);
                wordContainer.classList.add('clicked');
                wordContainer.remove();
                secondParent.appendChild(wordContainer);

                if (wordObjects.length === clickedWords.length) {
                    checkResult(clickedWords, wordObjects);
                }
            }
        });
    });
};

function checkResult(clickedWords, wordObjects) {
    console.log('checkResult');
    console.log('attemptCount', attemptCount);
    const indexesInString = wordObjects.map((_, index) => index); // Отримуємо правильну послідовність
    for (let i = 0; i < indexesInString.length; i++) {
        if (clickedWords[i] !== indexesInString[i]) { // Якщо послідовність неправильна
            if (attemptCount === 1) { // Якщо це перша спроба
                const firstParent = document.getElementById('userVersion'); // Контейнер з обраними словами
                const secondParent = document.getElementById('originalWords'); // Контейнер з оригінальними словами
                const nestedElements = Array.from(firstParent.children); // Слова в контейнері
                nestedElements.forEach(function (nestedElement) {
                    secondParent.appendChild(nestedElement);
                });
                document.getElementById('errorInSentence').classList.remove('hide');
                if(document.getElementById('example-sentense-incorrect')) {
                    document.getElementById('example-sentense-incorrect').classList.remove('hide');
                }
                setTimeout(function () {
                    document.getElementById('errorInSentence').classList.add('hide');
                }, 1000);
                attachEventListeners(wordObjects);
                emptyWordList();
                return false;
            }
        }
    }
    document.getElementById('example-sentense-incorrect').classList.remove('hide');
    emptyWordList();
    return true;
}


// WIN MODAL -> END GAME
const endGameSequence = () => {
    wrapper.style.display = 'none';
    winModal.style.display = 'flex';
    winModal.querySelector('h1').textContent = t('congrats');
    setTimeout(() => {
        location.reload();
    }, 3000);
    window.addEventListener('click', (event) => {
        if (event.target === winModal) {
            winModal.style.display = 'none';
            location.reload();
        }
    });
};

// CLEAR PROGRESS
const clearUserProgress = async () => {
    try {
        const response = await fetch('/api/clear-progress', {
            method: 'PATCH',
            credentials: 'include', // надсилання куки для авторизації
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error(`Failed to clear progress: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.message, 'Modified count:', data.modifiedCount);
        // Оновлюємо UI, наприклад, статистику категорій
        updateCategoryStats();
    } catch (error) {
        console.error('Error clearing user progress:', error);
    }
};
const clearProgressButton = document.getElementById('clear-progress');
if (clearProgressButton) {
    clearProgressButton.addEventListener('click', clearUserProgress);
}

// LOGOUT
if (!document.getElementById('logout-btn')) {
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logout-btn';
    logoutBtn.dataset.i18n = 'logout';
    logoutBtn.textContent = t('logout');
    logoutBtn.addEventListener('click', async () => {
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (res.ok) {
                window.location.href = '/';
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    });

    const container = document.querySelector('.header');
    container.appendChild(logoutBtn);
}

// HELPERS =======================================================================================================
// CHECK PRESS ENTER BUTTON
guessInput.addEventListener('keyup', checkGuess);
// END GAME BUTTON
endGameBtn[0].addEventListener('click', () => {location.reload();});
// HELP MODAL OPEN
help[0].addEventListener('click', () => {
    if (rules.classList.contains('active')) {
        help[0].classList.remove('active');
        rules.classList.remove('active');
    } else {
        help[0].classList.add('active');
        rules.classList.add('active');
    }
});

