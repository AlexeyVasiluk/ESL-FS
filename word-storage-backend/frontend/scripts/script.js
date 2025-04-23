// ESL script.js — fixed all API URLs to use relative paths

const wordElement = document.getElementById('word');
const guessInput = document.getElementById('guessInput');
const checkAnswerBtn = document.getElementById('checkAnswer');
const countElement = document.getElementById('count');
const statsElement = document.getElementById('stats');
const totalQuestions = document.getElementById('total_question');
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
        const response = await fetch(`/api/words?category=${category}`);
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
};

const startGame = () => {
    statsElement.innerHTML = '';
    resultText = '';
    answerLog = [];
    correctCount = 0;
    wrongCount = 0;
    totalQuestions.textContent = `Words left: ${words.length}`;
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

guessInput.addEventListener('keyup', checkGuess);

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
        if (!response.ok) throw new Error(`Failed to update progress (${response.status})`);
        const resData = await response.json();
        words = words.filter((word) => word._id !== wordId);
        totalQuestions.textContent = `Words left: ${words.length}`;
    } catch (error) {
        console.error('Error saving progress:', error);
    }
};

const clearUserProgress = async () => {
    try {
        const response = await fetch('/api/clear-progress', {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error(`Failed to clear progress: ${response.status}`);
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
    logoutBtn.textContent = 'Logout';
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

endGameBtn[0].addEventListener('click', () => { location.reload(); });
help[0].addEventListener('click', () => {
    if (rules.classList.contains('active')) {
        help[0].classList.remove('active');
        rules.classList.remove('active');
    } else {
        help[0].classList.add('active');
        rules.classList.add('active');
    }
});
