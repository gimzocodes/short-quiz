const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = []; 

fetch("questions.json")      //https://opentdb.com/api.php?amount=10&category=19&difficulty=easy&type=multiple (open trivia db ez math q)
.then( res => {
    console.log(res);
    return res.json();
}).then( loadedQuestions =>{
    console.log(loadedQuestions );      //.results after loadedQuestions in ln23 if using open trivia db array
    questions = loadedQuestions ;       //(ln 24 after loadedQuestions)  .results.map( loadedQuestions => { const formattedQuestion = { question: loadedQuestions.question };  const answerChoices = [...loadedQuestions.incorrect_answers];  formattedQuestion.answer = Math.floor(Math.random() * 3 ) + 1;  answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestions.correct_answer);answerChoices.forEach((choice, index) => {     formattedQuestion["choice" + (index + 1)] = choice; return formattedQuestion;}); use all this if using trivia db;

    startGame();
})
.catch( err => {
    console.log(err);
});

//constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

function startGame() {
    questionCounter = 0;
    score = 0; 
    availableQuestions = [...questions];
    getNewQuestion();
    
    setTimeout( () => {game.classList.remove('hidden')}, 1100);

    setTimeout( () => { loader.classList.add('hidden')}, 1000);
}; 
 
getNewQuestion = () => {
    
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        // GO TO the END PAGE 
        return window.location.assign('end.html');
    };

    questionCounter++;
    progressText.innerText = 'Question' + ' ' + questionCounter
    + '/' + MAX_QUESTIONS;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;


};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
     if(!acceptingAnswers) return;

     acceptingAnswers = false;
     const selectedChoice = e.target;
     const selectedAnswer = selectedChoice.dataset['number'];
    
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if(classToApply === 'correct') {
        incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout( () => {
        selectedChoice.parentElement.classList.remove(classToApply);  
        getNewQuestion();  
    }, 1000);
  
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};
 

// getting a random integer between 0 and x ==> Math.floor(Math.random() * x)

//mumma ke phone ka ip address:  fe80::c4bc:bbff:fed9:9b78  192.168.1.5