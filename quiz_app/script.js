const quizData = [
    {
        question: "What is the chemical symbol for water?",
        a: "H",
        b: "O",
        c: "W",
        d: "H2O",
        correct: "d",
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        a: "Mars",
        b: "Venus",
        c: "Jupiter",
        d: "Saturn",
        correct: "a",
    },
    {
        question: "What is the powerhouse of the cell?",
        a: " Nucleus",
        b: " Mitochondria",
        c: "Ribosome",
        d: " Endoplasmic reticulum",
        correct: "b",
    },
    {
        question: "What is the largest mammal on Earth?",
        a: "Elephant",
        b: "Blue whale",
        c: "Giraffe",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "What is the process by which plants make their own food?",
        a: "Respiration",
        b: "Photosynthesis",
        c: "Transpiration",
        d: "Digestion",
        correct: "b",
    }
];



let questionEl=document.querySelector("#question");
let optionA=document.querySelector("#a_text");
let optionB=document.querySelector("#b_text");
let optionC=document.querySelector("#c_text");
let optionD=document.querySelector("#d_text");
let button=document.querySelector("#submit");
let answerEl=document.querySelectorAll(".answer");

let currentQuiz =0;
let score=0;

loadQuiz();

function loadQuiz()
{
    deSelected();
    let currentQuizData=quizData[currentQuiz];
    // console.log(currentQuizData);
    let currentQuizQues=currentQuizData.question;
    // console.log(currentQuizQues);
    questionEl.textContent=currentQuizQues;
    


    optionA.textContent=currentQuizData.a;
    optionB.textContent=currentQuizData.b;
    optionC.textContent=currentQuizData.c;
    optionD.textContent=currentQuizData.d;

}

function selected()
{
    let answer=undefined;
    answerEl.forEach(answers => {
        if(answers.checked)
        {
            answer=answers.id;
        }
    });
    // console.log(answer);
    return (answer)
}

function deSelected()
{

    answerEl.forEach(answers=>
        {
            answers.checked = false;
        });
}


button.addEventListener("click",()=>
{

    let answer=selected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
                
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});
