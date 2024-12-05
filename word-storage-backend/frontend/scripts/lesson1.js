import {lesson1Words} from '../words/ua/lessons/lesson1-words.js';
const wordData = {
    "lesson-1-words": lesson1Words
};

const countWord = (wordData) => {
    var parentElement = '';
    var innerElement = '';

    for (const key in wordData) {
        if (wordData.hasOwnProperty(key)) {
            const data = wordData[key];
            if (localStorage.getItem(key)) {
                var arrayFromLocalhost = JSON.parse(localStorage.getItem(key));
                parentElement = document.getElementById(key);
                innerElement = parentElement.querySelector("span");
                innerElement.innerHTML = ' <span class="green">' + (data.length - arrayFromLocalhost.length) + '</span> / <span class="red">' + arrayFromLocalhost.length + '</span>';
            } else {
                parentElement = document.getElementById(key);
                console.log("parentElement", parentElement);
                innerElement = parentElement.querySelector("span");
                console.log("innerElement", innerElement);
                innerElement.innerHTML = ' <span class="green">' + '0' + '</span> / <span class="red">' + data.length + '</span>';
            }
        }
    }
};
countWord(wordData);

const wordElement = document.getElementById('word');
const guessInput = document.getElementById('guessInput');
const checkAnswerBtn = document.getElementById('checkAnswer');
const countElement = document.getElementById('count');
const statsElement = document.getElementById('stats');
const totalQuestions = document.getElementById('total_question');
const wrapper = document.getElementById('wrapper');
const endGame = document.getElementsByClassName('end-game');
const buttonsArray = document.querySelectorAll('.words-button');
const tabContents = document.querySelectorAll(".tab-content");
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const bars = document.getElementsByClassName('bar');
const sections = document.querySelectorAll('.accordion-section');
const startModal = document.getElementById('startModal');
const winModal = document.getElementById('winModal');
const closeButton = document.querySelector('.close');
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

buttonsArray.forEach(button => {
    button.addEventListener("click", createEventListenerForButton(button.id));
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

const chooseWordsArray = (wordArray, id) => {
    buttonsArray.forEach((element) => element.classList = 'words-button');
    document.getElementById(id).classList += ' active';
    buttonsArray.forEach((element) => {
        if (!element.classList.contains('active')) {
            element.classList.add('hidden');
        }
    });
    // random array shuffle
    if (localStorage.getItem(id)) {
        words = JSON.parse(localStorage.getItem(id))
    } else {
        for (let i = wordArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
        }
        words = wordArray;
        localStorage.setItem(id, JSON.stringify(words));
    }
    arrayId = id;
    startGame(id);
};

const startGame = (id) => {
    currentWordIndex = 0;
    statsElement.innerHTML = '';
    if (resultText) {
        resultText = '';
        answerLog = [];
        correctCount = 0;
        wrongCount = 0;
    }
    totalQuestionsText = 'Words left: ';
    wrapper.style.display = 'inline-block';
    guessInput.focus();
    totalQuestions.textContent = (totalQuestionsText += words.length);
    showWord(currentWordIndex, id);
};

const showWord = (id) => {
    if (words.length <= 0) { // end of game
        guessInput.removeEventListener('keyup', checkGuess);
        localStorage.removeItem(arrayId);
        wrapper.style.display = 'none';
        winModal.style.display = 'block';
        setTimeout(() => {
            location.reload();
        }, 3000);
    } else {
        randomIndex = randomElemFromArray(words);
        setTimeout(() => {
            wordElement.textContent = words[randomIndex].word.toLowerCase();
            guessInput.value = '';
            guessInput.style.backgroundColor = "";
            setSomeAttribute(checkAnswerBtn, 'class', '');
            guessInput.disabled = false;
        }, 1500);
    }
};

const randomElemFromArray = (words) => {
    let currentIndex = words.length;
    if (currentIndex > 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        return randomIndex;
    }
};

const checkGuess = (event) => {
    const goCheck = () => {
        const guess = guessInput.value.trim().toLowerCase();
        const currentWord = words[randomIndex];

        if (guess === currentWord.translation.trim().toLowerCase()) {
            guessInput.style.backgroundColor = "#5bc20f";
            setTimeout(function () {
                guessInput.style.backgroundColor = "";
            }, 1500);
            currentWord.guessed = true;
            currentWord.correctCount = (currentWord.correctCount || 0) + 1;
            if (currentWord.correctCount >= 1) { // remove word from array
                removeWord(currentWord, arrayId);
            }
            correctCount++;
        } else {
            guessInput.style.backgroundColor = "#ff0000";
            wrongCount++;
        }

        const answerInfo = {
            question: currentWord.word,
            answer: currentWord.translation,
            input: guess,
            correct: currentWord.guessed,
            examples: currentWord.example
        };
        answerLog.push(answerInfo);
        showResults();
        currentWordIndex++;
        totalQuestions.textContent = `Words left: ${words.length}`;
        statsElement.scrollTop = 0;
    }
    checkAnswerBtn.onclick=function () {goCheck();}

    if (event.key === 'Enter') {
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
    showWord();
}

function setSomeAttribute(el, attr, val) {
    el.setAttribute(attr, val);
}

const showResults = () => {
    resultText = '';
    resultCount = '';
    resultCount += `<div class="result-row"><span style='color: green;'>Correct: ${correctCount} | </span><span style='color: red;'>Wrong: ${wrongCount}</span></div>`;

    // answerLog.forEach((answer, index) => {
    for (let i = 0; i < answerLog.length; i++) {
        let answer = answerLog[i];
        let lastAnswer = answerLog[answerLog.length - 1];

        if (!lastAnswer.correct) {
            setSomeAttribute(guessInput, 'disabled', '');
            setSomeAttribute(checkAnswerBtn, 'class', 'hide');

            resultText += `<div class="result-row">
                                ${answer.question} - <span style='font-weight: bold;'>${answer.answer}</span><br> 
                                <div class="example-text">
                                    <span style="font-weight: bold;"> Example: </span>${answer.examples}
                                </div>
                          </div>`;
            document.getElementById('makeSentence').classList.remove('hide');
            // =============================================
            let clickedWords = [];
            let wordObjects = [];
            let originalString = answer.examples;
            wordObjects = createWordObjects(originalString);
            function createWordObjects(inputString) {
                const words = inputString.split(' ');
                const wordObjects = words.map((word, index) => ({ word, index }));
                return wordObjects;
            }

            const shuffledWordObjects = shuffleWords(wordObjects);
            function shuffleWords(wordObjects) {
                return [...wordObjects].sort(() => Math.random() - 0.5);
            }

            function numberWords(wordObjects) {
                const numberedWords = wordObjects.map((obj) => `<span class="word-container" data-index="${obj.index}">${obj.word}</span>`);
                document.getElementById('originalWords').innerHTML = numberedWords.join(' ');

                // Додаємо слухача подій для обробки кліку на словах
                attachEventListeners(shuffledWordObjects);
            }
            numberWords(shuffledWordObjects);

            function attachEventListeners(wordObjects) {
                const wordContainers = document.querySelectorAll('.word-container');
                wordContainers.forEach(function (wordContainer) {
                    wordContainer.classList.remove('clicked');
                    clickedWords = [];
                    wordContainer.addEventListener('click', function () {
                        const secondParent = document.getElementById('userVersion');
                        const index = parseInt(wordContainer.getAttribute('data-index'), 10);
                        if (!isNaN(index) && !clickedWords.includes(index)) {
                            clickedWords.push(index);
                            wordContainer.classList.add('clicked');
                            wordContainer.remove();
                            secondParent.appendChild(wordContainer);
                            if(wordObjects.length <= clickedWords.length) {
                                checkResult(clickedWords, wordObjects);
                            }
                        }
                    });
                });
                return clickedWords;
            }

            let attemptCount = 0;
            function checkResult(clickedWords, wordObjects) {
                const indexesInString = wordObjects.map((_, index) => index);

                for (let i = 0; i < indexesInString.length; i++) {
                    if (clickedWords[i] !== indexesInString[i]) {
                        attemptCount++;
                        if(attemptCount === 1){
                            const firstParent = document.getElementById('userVersion');
                            const secondParent = document.getElementById('originalWords');
                            const nestedElements = Array.from(firstParent.children);
                            nestedElements.forEach(function (nestedElement) {
                                secondParent.appendChild(nestedElement);
                            });
                        }
                        if(attemptCount === 2){
                            emptyWordList();
                            return false;
                        }
                        document.getElementById('errorInSentence').classList.remove('hide');
                        setTimeout(function () {
                            document.getElementById('errorInSentence').classList.add('hide');
                        },1000)
                        attachEventListeners(wordObjects);
                        return false;
                    }
                }
                emptyWordList();
                return true;
            }
        }
        else{
            resultText += `<div class="result-row">${answer.question} - <span style='font-weight: bold;'>${answer.answer}</span><br>
                                <div class="example-text correct">
                                    <span style="font-weight: bold;"> Example: </span>${answer.examples}
                                </div>
                          </div>`;
            emptyWordList();
        }

    }
    // });

    countElement.innerHTML = resultCount;
    statsElement.innerHTML = resultText;

    const exampleElements = document.querySelectorAll('.example-text');
    if (exampleElements.length >= 1 & !exampleElements[exampleElements.length - 1].classList.contains('correct')) {
        exampleElements[exampleElements.length - 1].classList.add('hide');
    } else if (exampleElements.length === 0) {
        exampleElements[0].classList.add('hide');
    }

};

const removeWord = (word, arrayId) => {
    words = words.filter((w) => w !== word);
    localStorage.setItem(arrayId, JSON.stringify(words));
};

guessInput.addEventListener('keyup', checkGuess);

// EndGame
for (const el of endGame) {
    el.addEventListener('click', function() {
        countWord();
        location.reload();
    });
}

// Choose words array button on click
function handleWordsButtonClick() {
    if (window.innerWidth <= 1100) {
        const buttons = document.getElementsByClassName('words-button');
        for (const button of buttons) {
            button.addEventListener('click', handleMenuButtonClick);
        }
    }
}
handleWordsButtonClick();
window.addEventListener('resize', handleWordsButtonClick);

// Menu
menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuToggle.querySelectorAll(".bar").forEach(bar => {
        bar.classList.toggle("change");
    });
});

// Hamburger icon on click
function handleMenuButtonClick() {
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        for (const bar of bars) {
            bar.classList.remove('change');
        }
    }
}

// Accordion
sections.forEach((section) => {
    const header = section.querySelector('.accordion-header');
    const content = section.querySelector('.accordion-content');
    header.addEventListener('click', () => {
        sections.forEach((otherSection) => {
            if (otherSection !== section) {
                otherSection.classList.remove('active');
                otherSection.querySelector('.accordion-content').style.display = 'none';
            }
        });
        section.classList.toggle('active');
        if (section.classList.contains('active')) {
            content.style.display = 'flex';
        } else {
            content.style.display = 'none';
        }
    });
});

window.addEventListener('click', (event) => {
    if (event.target === startModal) {
        startModal.style.display = 'none';
    }
    if (event.target === winModal) {
        winModal.style.display = 'none';
        location.reload();
    }
});

// Loader
var loader = document.getElementById('loader');
var content = document.getElementById('word');
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length > 0) {
            loader.style.display = 'none';
            content.style.display = 'inline';
            observer.disconnect();
        }
    });
});
observer.observe(content, {childList: true});
