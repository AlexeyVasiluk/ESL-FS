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
let randomIndex = 0;
let arrayId = '';
let attemptCount = 1;
correctCountElement.textContent = `0`;
wrongCountElement.textContent = `0`;

const updateCategoryStats = async () => {
    try {
        const response = await fetch('/api/category-stats', {
            method: 'GET',
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch category stats');
        const stats = await response.json();

        stats.forEach((stat) => {
            const category = stat._id;
            const guessedCount = stat.guessed;
            const totalCount = stat.total;
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

document.addEventListener('DOMContentLoaded', () => {
    updateCategoryStats();
});

buttonsArray.forEach((button) => {
    button.addEventListener('click', async () => {
        const category = button.id;
        await chooseWordsArray(category);
    });
});

const fetchWords = async (category) => {
    try {
        const lang = getLang(); // 'uk'|'ru'|'es'
        const response = await fetch(
            `/api/words?category=${encodeURIComponent(category)}&lang=${lang}`,
            { credentials: 'include' }
        );
        if (!response.ok) throw new Error('Failed to fetch words');
        return await response.json();
    } catch (error) {
        console.error('Error fetching words:', error);
        return [];
    }
};

const fetchProgress = async () => {
    try {
        const response = await fetch('/api/progress', {
            method: 'GET',
            credentials: 'include'
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

const chooseWordsArray = async (category) => {
    try {
        const data = await fetchWords(category);
        const progress = await fetchProgress();
        words = data.filter((word) => {
            const userWord = progress.find((p) => p.wordId === word._id);
            return !(userWord && userWord.status === 'guessed');
        });
        arrayId = category;
        startGame();
    } catch (error) {
        console.error('Error choosing words array:', error);
    }
    document.getElementById('vocabulary-content').classList.toggle('expanded');
};

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

        const isCorrect = guess === currentWord.translation.trim().toLowerCase();
        if (isCorrect) {
            guessInput.style.backgroundColor = "#5bc20f";
            correctCount++;

            try {
                await saveProgress(currentWord._id, true);
            } catch (error) {
                console.error('Error updating word in database:', error);
            }
            words = words.filter((word) => word._id !== currentWord._id);
        } else {
            guessInput.style.backgroundColor = "#ff0000";
            wrongCount++;
        }

        answerLog.push({
            question: currentWord.word,
            answer: currentWord.translation,
            input: guess,
            correct: isCorrect,
            examples: currentWord.example,
        });

        showResults();

        await updateCategoryStats();

        if (words.length === 0) {
            endGameSequence();
        }
    };
    checkAnswerBtn.onclick = goCheck;
    if (event.key === "Enter") {
        goCheck();
    }
};

const saveProgress = async (wordId, guessed) => {
    try {
        const response = await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                wordId,
                status: guessed ? 'guessed' : 'not_guessed'
            }),
            credentials: 'include'
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

const showResults = () => {
    resultText = '';
    correctCountElement.textContent = `${correctCount}`;
    wrongCountElement.textContent = `${wrongCount}`;

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

const handleIncorrectAnswer = (answer) => {
    resultText = `<div class="result-row">
        ${answer.question} - <span style='font-weight: bold;'>${answer.answer}</span><br>
        <div id="example-sentense-incorrect" class="hide">
            <span style="font-weight: bold;">${t('example')}</span> ${answer.examples}
        </div>
    </div>`;
    document.getElementById('makeSentence').classList.remove('hide');
    const wordObjects = createWordObjects(String(answer.examples));
    const shuffledWordObjects = shuffleWords(wordObjects);

    renderShuffledWords(shuffledWordObjects);
    attachEventListeners(shuffledWordObjects);
};

const handleCorrectAnswer = (answer) => {
    resultText = `<div class="result-row">
        ${answer.question} - <span style='font-weight: bold;'>${answer.answer}</span><br>
        <div id="example-sentense-correct">
            <span style="font-weight: bold;"> Example: </span>${answer.examples}
        </div>
    </div>`;
    emptyWordList();
};

function emptyWordList() {
    const elementsToDelete = document.querySelectorAll('.word-container');
    Array.from(elementsToDelete).forEach(element => element.remove());
    document.querySelectorAll('.example-text').forEach(element => {
        element.classList.remove('hide');
    });
    setTimeout(() => {
        document.getElementById('makeSentence').classList.add('hide');
        showWord();
    }, 2000);
}

const createWordObjects = (inputString) => {
    if (typeof inputString !== 'string') {
        console.error('Expected a string but got:', inputString);
        return [];
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
    const indexesInString = wordObjects.map((_, index) => index);
    for (let i = 0; i < indexesInString.length; i++) {
        if (clickedWords[i] !== indexesInString[i]) {
            if (attemptCount === 1) {
                const firstParent = document.getElementById('userVersion');
                const secondParent = document.getElementById('originalWords');
                const nestedElements = Array.from(firstParent.children);
                nestedElements.forEach(function (nestedElement) {
                    secondParent.appendChild(nestedElement);
                });
                document.getElementById('errorInSentence').classList.remove('hide');
                document.getElementById('makeSentence').classList.add('hide');
                if(document.getElementById('example-sentense-incorrect')) {
                    document.getElementById('example-sentense-incorrect').classList.remove('hide');
                }
                setTimeout(function () {
                    document.getElementById('errorInSentence').classList.add('hide');
                }, 2000);
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

const clearUserProgress = async () => {
    try {
        const response = await fetch('/api/clear-progress', {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error(`Failed to clear progress: ${response.status}`);
        }
        const data = await response.json();
        updateCategoryStats();
    } catch (error) {
        console.error('Error clearing user progress:', error);
    }
};
const clearProgressButton = document.getElementById('clear-progress');
if (clearProgressButton) {
    clearProgressButton.addEventListener('click', clearUserProgress);
}

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

guessInput.addEventListener('keyup', checkGuess);

endGameBtn[0].addEventListener('click', () => {location.reload();});

help[0].addEventListener('click', () => {
    if (rules.classList.contains('active')) {
        help[0].classList.remove('active');
        rules.classList.remove('active');
    } else {
        help[0].classList.add('active');
        rules.classList.add('active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const header  = document.getElementById('vocabulary-header');
    const vocabularyContent = document.getElementById('vocabulary-content');
    const menuStatus = document.getElementById('vocabulary-section');

    header.addEventListener('click', () => {
        vocabularyContent.classList.toggle('expanded');
        menuStatus.classList.toggle('active');
    });
});
