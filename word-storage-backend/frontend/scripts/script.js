const wordElement = document.getElementById('word');
const guessInput = document.getElementById('guessInput');
const checkAnswerBtn = document.getElementById('checkAnswer');
const countElement = document.getElementById('count');
const statsElement = document.getElementById('stats');
const totalQuestions = document.getElementById('total_question');
const wrapper = document.getElementById('wrapper');
const endGameBtn = document.getElementsByClassName('end-game');
const buttonsArray = document.querySelectorAll('.words-button');
const vocabularyHeader = document.getElementById("vocabulary-header");
const vocabularySection = document.getElementById('vocabulary-section');
const vocabularyContent = document.getElementById('vocabulary-content');
const winModal = document.getElementById('winModal');
const rules = document.getElementById('rules');
const help = document.getElementsByClassName('help');
var content = document.getElementById('word');
let words = [];
let answerLog = [];
let totalQuestionsText = 'Total words left: ';
let currentWordIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let resultText = '';
let resultCount = '';
let randomIndex = 0;
let arrayId = '';

let attemptCount = 1; // Лічильник спроб

// const userId = 'test-user-123'; // Задайте унікальний ID користувача

const fetchWords = async (category) => {
    try {
        const response = await fetch(`http://localhost:5000/api/words?category=${category}`);
        if (!response.ok) throw new Error('Failed to fetch words');
        return await response.json(); // API повертає тільки потрібні слова
    } catch (error) {
        console.error('Error fetching words:', error);
        return [];
    }
};

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

// Викликаємо функцію при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    updateCategoryStats();
    updateUserProgressUI();
});

const saveProgress = async (wordId, guessed) => {
    try {
        // Викликаємо захищений маршрут, який зберігає прогрес у окремій колекції UserProgress
        const response = await fetch('http://localhost:5000/api/progress', {
            method: 'POST', // використовується POST для створення/оновлення запису
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                wordId,
                status: guessed ? 'guessed' : 'not_guessed'
            }),
            credentials: 'include' // надсилання куків для авторизації
        });

        if (!response.ok) {
            throw new Error(`Failed to update progress (${response.status})`);
        }
        const resData = await response.json();
        console.log(`Progress updated for word ID: ${wordId}`, resData);

        // Можна видалити слово з локального масиву, якщо це потрібно:
        words = words.filter((word) => word._id !== wordId);
        totalQuestions.textContent = `Words left: ${words.length}`;
        updateUserProgressUI();
    } catch (error) {
        console.error('Error saving progress:', error);
    }
};


buttonsArray.forEach((button) => {
    button.addEventListener('click', async () => {
        const category = button.id;
        await chooseWordsArray(category);
    });
});


function createEventListenerForButton(buttonId) {
    return () => {
        const data = wordData[buttonId];
        if (data) {
            chooseWordsArray(data, buttonId);
        } else {
            console.error(`Data not found for button with ID ${buttonId}`);
        }
    };
}

const fetchProgress = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/progress', {
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


async function updateUserProgressUI() {
    const progressData = await fetchProgress();
    // Підраховуємо кількість вгаданих слів
    const guessedCount = progressData.filter(item => item.status === 'guessed').length;
    // Відображаємо статистику (наприклад, у елементі з id "stats")
    const statsElement = document.getElementById('stats');
    statsElement.textContent = `Guessed words: ${guessedCount}`;
    console.log('updateUserProgressUI works');
}

const chooseWordsArray = async (category) => {
    try {
        const data = await fetchWords(category);
        const progress = await fetchProgress();  // Тепер без userId
        words = data.map((word) => {
            const userWord = progress.find((p) => p.wordId === word._id);
            return {
                ...word,
                guessed: userWord ? userWord.status === 'guessed' : false,
            };
        });

        arrayId = category;
        startGame();
    } catch (error) {
        console.error('Error choosing words array:', error);
    }
};

const startGame = () => {
    currentWordIndex = 0;
    statsElement.innerHTML = '';
    resultText = '';
    answerLog = [];
    correctCount = 0;
    wrongCount = 0;
    totalQuestionsText = 'Words left: ';
    totalQuestions.textContent = `${totalQuestionsText} ${words.length}`;
    wrapper.style.display = 'inline-block';
    guessInput.focus();
    showWord();
};

const showWord = () => {
    if (words.length > 0) {
        randomIndex = Math.floor(Math.random() * words.length);
        wordElement.textContent = words[randomIndex].word.toLowerCase();
        guessInput.style.backgroundColor = "";
        guessInput.value = '';
        guessInput.focus();
    }
};

const checkGuess = (event) => {
    const goCheck = async () => {
        const guess = guessInput.value.trim().toLowerCase();
        const currentWord = words[randomIndex];

        if (guess === currentWord.translation.trim().toLowerCase()) {
            // Якщо відповідь правильна
            guessInput.style.backgroundColor = "#5bc20f";
            setTimeout(() => {
                // guessInput.style.backgroundColor = "";
            }, 1500);

            currentWord.guessed = true; // Оновлюємо статус слова в локальному масиві
            correctCount++; // Збільшуємо лічильник правильних відповідей

            try {
                // Відправляємо оновлений статус слова в базу даних
                await saveProgress(currentWord._id, true);
                console.log(`Updated word ${currentWord.word} in database`);
            } catch (error) {
                console.error('Error updating word in database:', error);
            }

            // Видаляємо слово з масиву
            words = words.filter((word) => word._id !== currentWord._id);
        } else {
            // Якщо відповідь неправильна
            guessInput.style.backgroundColor = "#ff0000";
            setTimeout(() => {
                // guessInput.style.backgroundColor = "";
            }, 1500);

            wrongCount++; // Збільшуємо лічильник неправильних відповідей
        }

        // Додаємо відповідь у журнал відповідей
        const answerInfo = {
            question: currentWord.word,
            answer: currentWord.translation,
            input: guess,
            correct: currentWord.guessed,
            examples: currentWord.example,
        };

        answerLog.push(answerInfo);

        // Оновлюємо статистику
        showResults();

        // Очищаємо поле вводу
        // guessInput.value = '';
        // guessInput.focus();

        // Якщо більше немає слів, завершити гру
        if (words.length === 0) {
            endGameSequence();
        }
    };

    // Виконати перевірку після натискання кнопки або Enter
    checkAnswerBtn.onclick = goCheck;

    if (event.key === "Enter") {
        goCheck();
    }
};

function emptyWordList() {
    const elementsToDelete = document.querySelectorAll('.word-container');
    Array.from(elementsToDelete).forEach(element => element.remove());
    document.querySelectorAll('.example-text').forEach(element => {
        element.classList.remove('hide');
    });
    document.getElementById('makeSentence').classList.add('hide');
    setTimeout(() => {
        showWord();
    }, 1500);
}

const showResults = () => {
    resultText = '';
    resultCount = `<div class="result-row"><span style='color: green;'>Correct: ${correctCount} | </span><span style='color: red;'>Wrong: ${wrongCount}</span></div>`;

    for (let i = 0; i < answerLog.length; i++) {
        const answer = answerLog[i];
        const lastAnswer = answerLog[answerLog.length - 1];

        if (!lastAnswer.correct) {
            handleIncorrectAnswer(answer);
        } else {
            handleCorrectAnswer(answer);
        }
    }

    countElement.innerHTML = resultCount;
    statsElement.innerHTML = resultText;
};

const handleIncorrectAnswer = (answer) => {
    resultText = `<div class="result-row">
        ${answer.question} - <span style='font-weight: bold;'>${answer.answer}</span><br>
        <div class="example-text">
            <span style="font-weight: bold;"> Example: </span>${answer.examples}
        </div>
    </div>`;

    document.getElementById('makeSentence').classList.remove('hide');

    const wordObjects = createWordObjects(String(answer.examples));
    const shuffledWordObjects = shuffleWords(wordObjects);

    renderShuffledWords(shuffledWordObjects);
    attachEventListeners(shuffledWordObjects);
};

const handleCorrectAnswer = (answer) => {
    resultText = `<div class="result-row">${answer.question} - <span style='font-weight: bold;'>${answer.answer}</span><br>
        <div class="example-text correct">
            <span style="font-weight: bold;"> Example: </span>${answer.examples}
        </div>
    </div>`;

    emptyWordList();
};

const createWordObjects = (inputString) => {
    if (typeof inputString !== 'string') {
        console.error('Expected a string but got:', inputString);
        return []; // Повертаємо порожній масив, якщо дані некоректні
    }
    const words = inputString.split(' ');
    return words.map((word, index) => ({ word, index }));
};

const shuffleWords = (wordObjects) => {
    return [...wordObjects].sort(() => Math.random() - 0.5);
};

const renderShuffledWords = (wordObjects) => {
    const numberedWords = wordObjects.map(obj => `<span class="word-container" data-index="${obj.index}">${obj.word}</span>`);
    document.getElementById('originalWords').innerHTML = numberedWords.join(' ');
};

const attachEventListeners = (wordObjects) => {
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
    const indexesInString = wordObjects.map((_, index) => index); // Отримуємо правильну послідовність
    for (let i = 0; i < indexesInString.length; i++) {
        if (clickedWords[i] !== indexesInString[i]) { // Якщо послідовність неправильна
            if (attemptCount === 1) { // Якщо це перша спроба
                const firstParent = document.getElementById('userVersion'); // Контейнер з обраними словами
                const secondParent = document.getElementById('originalWords'); // Контейнер з оригінальними словами
                const nestedElements = Array.from(firstParent.children); // Слова в контейнері

                // Переміщуємо слова назад у вихідний контейнер
                nestedElements.forEach(function (nestedElement) {
                    secondParent.appendChild(nestedElement);
                });

                // Показуємо повідомлення про помилку
                document.getElementById('errorInSentence').classList.remove('hide');
                setTimeout(function () {
                    document.getElementById('errorInSentence').classList.add('hide');
                }, 1500);

                // Додаємо обробники подій для повторної спроби
                attachEventListeners(wordObjects);

                emptyWordList(); // Очищуємо список
                return false; // Завершуємо функцію
            }
        }
    }

    emptyWordList(); // Якщо слова правильні, очищуємо список
    return true; // Завершуємо функцію
}

const endGameSequence = () => {
    wrapper.style.display = 'none';
    winModal.style.display = 'flex';
    setTimeout(() => {
        location.reload();
    }, 3000);
};

// HELPERS BELOW =======================================================================================================
guessInput.addEventListener('keyup', checkGuess);
// Rules block
endGameBtn[0].addEventListener('click', () => {
    location.reload();
});

help[0].addEventListener('click', () => {
    if (rules.classList.contains('active')) {
        help[0].classList.remove('active');
        rules.classList.remove('active');
    } else {
        help[0].classList.add('active');
        rules.classList.add('active');
    }
});

// Win Modal block
window.addEventListener('click', (event) => {
    if (event.target === winModal) {
        winModal.style.display = 'none';
        location.reload();
    }
});

function updateClassBasedOnWidth() {
    vocabularyHeader.addEventListener('click', (event) => {
        if (vocabularyContent.classList.contains('base')) {
            vocabularyContent.classList.remove('base');
            vocabularySection.classList.remove('active');
        } else {
            vocabularyContent.classList.add('base');
            vocabularySection.classList.add('active');
        }
    })
}

updateClassBasedOnWidth();

const clearGuessedWords = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/clear-guessed`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
        });
        if (!response.ok) throw new Error(`Failed to clear guessed words (${response.status})`);
    } catch (error) {
        console.error('Error resetting guessed words:', error);
    }
};

// Додаємо подію для кнопки
const clearButton = document.getElementById('clear');
if (clearButton) {
    clearButton.addEventListener('click', clearGuessedWords);
}

// Якщо кнопки "Вийти" ще немає, створюємо її
if (!document.getElementById('logout-btn')) {
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logout-btn';
    logoutBtn.textContent = 'Вийти';
    logoutBtn.addEventListener('click', async () => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/logout', {
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