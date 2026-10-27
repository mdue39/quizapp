"use strict";
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Transfer Markup Language",
            "Hyper Tool Multi Language",
        ],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "Which language styles web pages?",
        options: [
            "Java",
            "CSS",
            "Python",
            "SQL"
        ],
        correctAnswer: "CSS"
    },
    {
        question: "Which language adds interactivity?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Excel"
        ],
        correctAnswer: "JavaScript"
    },
    {
        question: "What does TS stand for?",
        options: [
            "Text Style",
            "TypeScript",
            "Table Structure",
            "Tech Sheet"
        ],
        correctAnswer: "TypeScript"
    },
    {
        question: "Which tag creates a heading?",
        options: [
            "<p>",
            "<img>",
            "<h1>",
            "<div>"
        ],
        correctAnswer: "<h1>"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = "";
let answerSubmitted = false;
const questionElement = document.getElementById("question");
const optionElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const progressElement = document.getElementById("progress");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    selectedAnswer = "";
    answerSubmitted = false;
    optionElement.innerHTML = "";
    feedbackElement.textContent = "";
    submitButton.disabled = true;
    nextButton.disabled = true;
    nextButton.textContent =
        currentQuestionIndex === questions.length - 1 ? "See results" : "Next question";
    questionElement.textContent = currentQuestion.question;
    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => {
            if (answerSubmitted) {
                return;
            }
            selectedAnswer = option;
            optionElement.querySelectorAll(".option-btn").forEach(optionButton => {
                optionButton.classList.remove("selected");
            });
            button.classList.add("selected");
            submitButton.disabled = false;
        });
        optionElement.appendChild(button);
    });
}
function submitAnswer() {
    if (answerSubmitted || selectedAnswer === "") {
        return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    answerSubmitted = true;
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        feedbackElement.textContent = "Correct!";
    }
    else {
        feedbackElement.textContent = "Incorrect!";
    }
    optionElement.querySelectorAll(".option-btn").forEach(button => {
        button.disabled = true;
    });
    submitButton.disabled = true;
    nextButton.disabled = false;
}
function nextQuestion() {
    if (!answerSubmitted) {
        return;
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
    else {
        showResults();
    }
}
function showResults() {
    document.getElementById("question-container")?.classList.add("hidden");
    document.getElementById("result-container")?.classList.remove("hidden");
    const finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = `You scored ${score} out of ${questions.length}`;
}
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("question-container")?.classList.remove("hidden");
    document.getElementById("result-container")?.classList.add("hidden");
    displayQuestion();
}
submitButton.addEventListener("click", submitAnswer);
nextButton.addEventListener("click", nextQuestion);
document.getElementById("restart-btn")?.addEventListener("click", restartQuiz);
displayQuestion();
