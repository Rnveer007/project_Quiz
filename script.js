import { questions } from "./questions.js";
import { musicQuestions } from "./musicQues.js";

let firstPage = document.querySelector("#page_first")
let btnAddUser = document.querySelector(".userBtn button");
let userNameHeading = document.querySelector(".userBtn h2");
let btnStartQuiz = document.querySelector(".startBtn");
let creatUserPop_up = document.querySelector(".addUser_pop_up");
let userAddedPop_up = document.querySelector(".createdUser_pop_up");
let userDetails = document.querySelector(".addUserInfo");
let userInput = document.querySelector(".addUserInfo input");
let btnAddDetails = document.querySelector(".create");
let btnQuitAddDetails = document.querySelector(".quit");
let userNameBox = document.querySelector(".userName");
let secondPage = document.querySelector(".page_second");
let musicOption = document.querySelector(".section_1");
let codingOption = document.querySelector(".section_3");
let btnStartGame = document.querySelector(".start_game");
let quizSection = document.querySelector(".quiz_section");
let questionBox = document.querySelector(".question_box");
let optBox = document.querySelector(".options");
let btnNextQues = document.querySelector("#nextQues");
let btnCloseQuiz = document.querySelector("#quit_quiz");
let quizInfoBox = document.querySelector(".ques_opt_box");
let quizResultItmes = document.querySelector("#quiz_result_box ");
let closeResultBox = document.querySelector("#quit_quiz_result");
let finalResulBox = document.querySelector(".result_heading p");
let btnShowFinalResult = document.querySelector("#getResultBtn");
let btnPlayAgain = document.querySelector("#playAgain");
let showTime = document.querySelector("#time");
let dateBox = document.querySelectorAll("#date");
let hero_2_section = document.querySelector(".hero_2");
let btnScore = document.querySelector("#score");
let scoreSection = document.querySelector("#score_section");
let showUserName = document.querySelectorAll("#userNameHeading");
let scoreItemBox = document.querySelector("#scoreitem");
let musicScoreItemBox = document.querySelector("#scoreitem_1");
let musicScoreSection = document.querySelector(".score_info_2");
let codingScoreSection = document.querySelector(".score_info_3");

// Flags for category selection
let isMusicSelected = false;
let isModernArtSelected = false;
let isCodingSelected = false;

// Variables to manage questions and answers
let codingQuestionsArry = [];
let condingCorrectAns = [];
let codingCurruntClickedAns = [];

let musicQuestionsArry = [];
let musicCorrectAns = [];
let musicCurruntClickedAns = [];

let timer = 15;
let timerInterval;

const data =
    localStorage.getItem("storedNames") !== null
        ? JSON.parse(localStorage.getItem("storedNames"))
        : [];
const player = {};
console.log(player);


btnAddUser.addEventListener("click", () => {
    userDetails.style.display = "block";  // Show a popup if the input is empty

})

btnAddDetails.addEventListener("click", startAddingUser);

function startAddingUser() {
    if (userInput.value === '') {
        alert("Fill the details");
    }
    else {
        player.name = userInput.value;
        player.regDate = getRegistrationDate();
        storeInLS();

        // Update UI elements to reflect the added user
        dateBox.forEach((date) => {
            date.innerHTML = player.regDate
        })
        showUserName.forEach((name) => {
            name.innerHTML = player.name
        })
        userNameBox.innerHTML = player.name;
        userDetails.style.display = "none";
        userAddedPop_up.style.display = "block";
        btnAddUser.style.display = "none";
        userNameHeading.innerHTML = player.name;
        userNameHeading.style.display = "block";


        setTimeout(() => {
            userAddedPop_up.style.display = "none";
        }, 1000);
    };
};


function storeInLS() {
    // data.pop();
    data.push(player);
    localStorage.setItem("storedNames", JSON.stringify(data));
    // console.log(data);
}

function getRegistrationDate() {
    const dt = new Date();
    const date = dt.getDate();
    const month = dt.getMonth() + 1;
    const year = dt.getFullYear();
    const hours = dt.getHours();
    const min = dt.getMinutes();
    const sec = dt.getSeconds();
    return `${date}-${month}-${year} ${hours}:${min}:${sec}`;
}

// startQuiz();

btnStartQuiz.addEventListener("click", startQuiz);

function startQuiz() {
    if (userInput.value === '') {
        creatUserPop_up.style.display = 'block'; // Show a popup if the input is empty

        setTimeout(() => {
            creatUserPop_up.style.display = "none"; // hide popup after 1 sec
        }, 1000);
    }
    else {
        firstPage.style.display = "none"; // Hide first page
        secondPage.style.display = "block"; // show second page
    }
}


// Event listener for the "Quit Adding Details" button
btnQuitAddDetails.addEventListener("click", () => {
    userInput.value = '';
    userDetails.style.display = "none";
})

// Initially hide both sections
musicScoreSection.style.display = "none";
codingScoreSection.style.display = "none";

// Event listener for selecting the coding section
codingOption.addEventListener("click", () => {
    codingOption.style.border = "3px solid green"; // Highlight coding selection
    musicOption.style.border = ""; 
    isCodingSelected = true;
    isMusicSelected = false;

    // Show the coding score section and hide the music score section
    codingScoreSection.style.display = "flex";
    musicScoreSection.style.display = "none";
});

// Event listener for selecting the music section
musicOption.addEventListener("click", () => {
    musicOption.style.border = "3px solid green";  
    codingOption.style.border = ""; // Remove highlight from coding selection
    isMusicSelected = true;
    isCodingSelected = false;

    // Show the music score section and hide the coding score section
    musicScoreSection.style.display = "flex";
    codingScoreSection.style.display = "none";
});


// Event listener for the "Start Game" button
btnStartGame.addEventListener("click", () => {
    if (!isCodingSelected && !isMusicSelected && !isModernArtSelected) {
        alert("Please select a section first");
        return;
    }
    else if (isCodingSelected === true) {
        // Navigate to the quiz section and display a question
        secondPage.style.display = "none"; // Hide category/second page
        quizSection.style.display = "block"; // show quiz section

        showCodingQuestion(); // Display the first question
        startTimer();
    }

    else if (isMusicSelected === true) {
        // Navigate to the quiz section and display a question
        secondPage.style.display = "none"; // Hide category/second page
        quizSection.style.display = "block"; // show quiz section

        // showCodingQuestion(); // Display the first question
        showMusicQuestion(); // Display the first question
        startTimer();
    }
});

function showMusicQuestion() {
    questionBox.innerHTML = ""; // Clear the previous question
    optBox.innerHTML = "";      // Clear the previous options

    const musicRandomIndex = musicRandomQuestions(); // Get a random question
    let musicQuestionHeading = document.createElement('h2');
    musicQuestionHeading.innerHTML = `${"Q :- "} ${musicQuestions[musicRandomIndex].question}`;// Display question
    musicCorrectAns.push(musicQuestions[musicRandomIndex].answer); // Get the correct answers

    musicQuestionHeading.classList = "questionHeading";
    questionBox.appendChild(musicQuestionHeading);

    showMusicOptions(musicQuestions[musicRandomIndex].options); // Display options.
};



function musicRandomQuestions() {
    let musicStoredQuestions = Math.floor(Math.random() * musicQuestions.length);
    if (musicQuestionsArry.includes(musicStoredQuestions)) {
        return musicRandomQuestions(); // Avoid duplicate questions
    }
    else {
        musicQuestionsArry.push(musicStoredQuestions);
        return musicStoredQuestions;
    };
};

function showMusicOptions(arry) {
    arry.forEach((option) => {
        let optPara = document.createElement("button");
        optPara.classList = "optHeading";
        optPara.innerHTML = option;
        optBox.append(optPara);

        optPara.addEventListener("click", function (e) {
            if (e.target.tagName === 'BUTTON') {
                optBox.querySelectorAll("button").forEach(btn => btn.disabled = true)
                e.target.disabled = false;
                musicCurruntClickedAns.push(e.target.innerHTML); // Store user's answer.
            }
        });
    });
};

function showCodingQuestion() {
    const randomIndex = randomQuestions(); // Get a random question
    let codingQuestions = document.createElement('h2');
    codingQuestions.innerHTML = `${"Q :- "} ${questions[randomIndex].q}`;// Display question
    condingCorrectAns.push(questions[randomIndex].a); // Get the correct answers


    codingQuestions.classList = "questionHeading";
    questionBox.appendChild(codingQuestions);

    showCodingOptions(questions[randomIndex].opt); // Display options.
};


// Function to display options for a question.
function showCodingOptions(arry) {
    arry.forEach((option) => {
        let optPara = document.createElement("button");
        optPara.classList = "optHeading";
        optPara.innerHTML = option;
        optBox.append(optPara);

        optPara.addEventListener("click", function (e) {
            if (e.target.tagName === 'BUTTON') {
                optBox.querySelectorAll("button").forEach(btn => btn.disabled = true)
                e.target.disabled = false;
                codingCurruntClickedAns.push(e.target.innerHTML); // Store user's answer.
            }
        });
    });
};

function randomQuestions() {
    let storedQuestions = Math.floor(Math.random() * questions.length);
    if (codingQuestionsArry.includes(storedQuestions)) {
        return randomQuestions();
    }
    else {
        codingQuestionsArry.push(storedQuestions);
        return storedQuestions;
    };
};


btnNextQues.addEventListener("click", () => {
    // Check if all questions for the selected category have been used
    if (codingQuestionsArry.length === questions.length) {
        quizInfoBox.style.display = "none";
        quizResultItmes.style.display = "block";  // Show the results.
        questionBox.innerHTML = '';
        optBox.innerHTML = '';
        codingQuestionsArry = [];
        clearInterval(timerInterval);
        showTime.innerHTML = "0";
    } else if (musicQuestionsArry.length === musicQuestions.length) {
        quizInfoBox.style.display = "none";
        quizResultItmes.style.display = "block";  // Show the results.
        questionBox.innerHTML = '';
        optBox.innerHTML = '';
        musicQuestionsArry = [];
        clearInterval(timerInterval);
        showTime.innerHTML = "0";
    } else {
        // Clear the previous question and options
        questionBox.innerHTML = '';
        optBox.innerHTML = '';

        // Show the next question based on the selected category
        if (isCodingSelected) {
            showCodingQuestion();
        } else if (isMusicSelected) {
            showMusicQuestion();
        }
    };
});


// Event listener for the "Close Quiz" button.
btnCloseQuiz.addEventListener("click", () => {
    // Reset all elements and return to the second page.
    userInput.value = '';
    questionBox.innerHTML = '';
    optBox.innerHTML = '';
    codingQuestionsArry = [];
    codingOption.style.border = "";
    isCodingSelected = false;
    quizSection.style.display = "none";
    secondPage.style.display = "block";
    // quizFlag = true;
});

closeResultBox.addEventListener("click", () => {
    userInput.value = '';
    userNameHeading.innerHTML = '';
    userNameHeading.style.display = "none";
    userNameBox.innerHTML = '';
    userNameBox.style.display = "none";
    questionBox.innerHTML = '';
    optBox.innerHTML = '';
    codingQuestionsArry = [];
    condingCorrectAns = [];
    codingCurruntClickedAns = [];
    codingOption.style.border = "";
    isCodingSelected = false;
    btnAddUser.style.display = "block";
    firstPage.style.display = "block";
    quizInfoBox.style.display = "block";
    quizResultItmes.style.display = "none"
    quizSection.style.display = "none";
});


// Event listener for the "Show Final Result" button
btnShowFinalResult.addEventListener("click", () => {
    if (isCodingSelected) {
        let score = 0;

        // Compare clicked answers with the correct answers
        codingCurruntClickedAns.forEach((clickedAnswer, index) => {
            if (clickedAnswer === condingCorrectAns[index]) {
                score++;
            }
        });

        // Display the score in the result box
        finalResulBox.innerHTML = `Your Score: ${score} / ${condingCorrectAns.length}`;
        player.codingScore = `${score} / ${condingCorrectAns.length}`;
        scoreItemBox.innerHTML = player.codingScore
        console.log(player.score)
    }
    else if (isMusicSelected) {
        let score = 0;

        // Compare clicked answers with the correct answers
        musicCurruntClickedAns.forEach((clickedAnswer, index) => {
            if (clickedAnswer === musicCorrectAns[index]) {
                score++;
            }
        });

        // Display the score in the result box
        finalResulBox.innerHTML = `Your Score: ${score} / ${musicCorrectAns.length}`;
        player.musicScore = `${score} / ${musicCorrectAns.length}`
        musicScoreItemBox.innerHTML = player.musicScore

    }
    // Show the result box
    finalResulBox.style.display = "block";
});


btnPlayAgain.addEventListener("click", () => {
    quizResultItmes.style.display = "none";
    quizInfoBox.style.display = "block";

    // Reset state for coding questions
    codingQuestionsArry = [];
    condingCorrectAns = [];
    codingCurruntClickedAns = [];

    // Reset state for music questions
    musicQuestionsArry = [];
    musicCorrectAns = [];
    musicCurruntClickedAns = [];

    // Clear the question and options boxes
    questionBox.innerHTML = '';
    optBox.innerHTML = '';

    finalResulBox.style.display = "none";
    quizSection.style.display = "block";

    // Start with a new question
    startTimer();
    if (isCodingSelected) {
        showCodingQuestion();
    }
    if (isMusicSelected) {
        showMusicQuestion();
    }
});


btnScore.addEventListener("click", () => {
    hero_2_section.style.display = "none";
    scoreSection.style.display = "block";
});



function startTimer() {
    // Clear any existing timer intervals
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Reset the timer to 15 seconds
    timer = 15;
    showTime.innerHTML = timer;

    // Start the countdown timer
    timerInterval = setInterval(() => {
        showTime.innerHTML = --timer; // Update the timer display

        if (timer === 0) {
            clearInterval(timerInterval);
            codingQuestionsArry = [];
            condingCorrectAns = [];
            codingCurruntClickedAns = [];
            questionBox.innerHTML = '';
            optBox.innerHTML = '';
            quizInfoBox.style.display = "none";
            quizResultItmes.style.display = "block";
        }
    }, 1000); // Decrease the timer every second
};
















