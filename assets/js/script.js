const startButton = document.getElementById('startBtn');
const app = document.getElementsByClassName('app');
var highscoreList = document.getElementById('hsList');
var timer;
var timerCount;
var timerElement = document.querySelector("#timerCount");
const playAgain = document.querySelector('#playAgain');

const questions = [
    {
        question: "What special sign is associated with 'id's?",
        answers: [
            {text: ".", correct: false},
            {text: "#", correct: true},
            {text: "%", correct: false},
            {text: "*", correct: false},
        ]
    },
    {
        question: "What document do you use to create functions and loops?",
        answers: [
            {text: "HTML", correct: false},
            {text: "CSS", correct: false},
            {text: "JS", correct: true},
            {text: "README", correct: false},
        ]
    },
    {
        question: "What section do you put links to CSS in your HTML?",
        answers: [
            {text: "Body", correct: false},
            {text: "Header", correct: false},
            {text: "Anywhere", correct: false},
            {text: "Head", correct: true},
        ]
    },
    {
        question: "What 'for loop' element indicates the automatic addition of a number in an array?",
        answers: [
            {text: "i=0", correct: false},
            {text: "i < array.length", correct: false},
            {text: "i++", correct: true},
            {text: "None of the above", correct: false},
        ]
    },
];

const questionEl = document.getElementById('question');
const answerButton = document.getElementById('btn');
const nextButton = document.getElementById('nextBtn');


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionEl.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('answerBtn');
        answerButton.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
        timerCount -= 5;
        }
    

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

const highscores = document.querySelector('.highscores');
const timerText = document.getElementsByClassName('timer');


function showScore() {
    resetState();
    questionEl.innerHTML = `Your score: ${score} out of ${questions.length}!`;
    playAgain.style.display = 'block';
    

    let scores = localStorage.getItem('scores');

    if (!scores) {
        scores = '[]'
    };

    const parsedScores = JSON.parse(scores);
    parsedScores.push( {
        score: score,
    });

    highscores.style.display = 'block';
    displayScore(parsedScores);

    localStorage.setItem('scores', JSON.stringify(parsedScores));
   // highscores.style.display = `Previous scores: ${[parsedScores]}`;
}

playAgain.addEventListener('click', function() {
    startQuiz();
    startButton.style.display = "none";
    app[0].style.display = 'block';
    startDesc.style.display = 'none';
    startTimer();
    timerCount = 60;
    timerText[0].style.display = 'block';
    highscores.style.display = 'none';
    playAgain.style.display = 'none';
})

function displayScore (arr) {
    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement('li');
        li.textContent = arr[i].score;
        highscoreList.appendChild(li);
    }
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
        clearInterval(timer);
        timerElement.textContent = 0;
    }
};

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

function startTimer() {
    timer = setInterval(function() {
        timerElement.textContent = timerCount;
        timerCount--;

    if (timerCount <= 0) {
        timerElement.textContent = 0;
        clearInterval(timer);
        showScore();
        }
    }, 1000);
};

const startDesc = document.getElementById('press-start');



startButton.addEventListener('click', function() {
    startQuiz();
    startButton.style.display = "none";
    app[0].style.display = 'block';
    startDesc.style.display = 'none';
    startTimer();
    timerCount = 60;
    timerText[0].style.display = 'block';
});


