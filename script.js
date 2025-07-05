const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
        answer: "Harper Lee"
    }
    ,
    {
        question: "What is the chemical symbol for water?",
        answers: ["H2O", "CO2", "O2", "NaCl"],
        answer: "H2O"
    },
    {
        question: "What is the capital of Japan?",
        answers: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        answer: "Tokyo"
    }
    ,
    {
        question: "What is the largest mammal?",
        answers: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
        answer: "Blue Whale"
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What is the capital of Australia?",
        answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        answer: "Canberra"
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const questionCounter = document.getElementById("question-counter");
const currentScoreElement = document.getElementById("current-score");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    updateProgressBar();
    updateScoreDisplay();
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    // Update question counter
    questionCounter.innerHTML = `Question ${questionNo} of ${questions.length}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer === currentQuestion.answer) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
    });
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

function updateScoreDisplay() {
    currentScoreElement.innerHTML = `Score: ${score}`;
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        selectedButton.classList.add("correct");
        score++;
        updateScoreDisplay();
    } else {
        selectedButton.classList.add("incorrect");
    }
    
    // Disable all buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });
    
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    updateProgressBar();
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    const percentage = (score / questions.length) * 100;
    let scoreClass = "";
    let message = "";
    
    if (percentage >= 80) {
        scoreClass = "score-excellent";
        message = "Excellent! 🎉";
    } else if (percentage >= 60) {
        scoreClass = "score-good";
        message = "Good job! 👍";
    } else {
        scoreClass = "score-poor";
        message = "Keep practicing! 📚";
    }
    
    questionElement.innerHTML = `
        <div class="final-score ${scoreClass}">
            ${message}<br>
            You scored ${score} out of ${questions.length}!<br>
            <small>(${percentage.toFixed(1)}%)</small>
        </div>
    `;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    progressBar.style.width = "100%";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length && nextButton.innerHTML === "Next") {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();