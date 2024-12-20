import { questions } from "./questions.js";
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
// let topicBox = document.querySelector("#topic");
// let scoreBox = document.querySelector("#scoreitem");
let secondPageQuizBtn = document.querySelector("#quizBtn_secondPage");
let dateBox = document.querySelector("#date");
let hero_2_section = document.querySelector(".hero_2");
let btnScore = document.querySelector("#score");
let scoreSection = document.querySelector("#score_section");
let secondPageHomeBtn = document.querySelector("#secondPageHomeBtn");

// Flags for category selection
let isMusicSelected = false;
let isModernArtSelected = false;
let isCodingSelected = false;
let quizFlag = false;

// Variables to manage questions and answers
let questionsArry = [];
let correctAns = [];
let curruntClickedAns = [];

let timer = 15;
let timerInterval;


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

// Event Listener: Displays the form to add user details
btnAddUser.addEventListener("click", () => {
    userDetails.style.display = "block";  // Show a popup if the input is empty

})

btnAddDetails.addEventListener("click", () => {
    if (userInput.value.trim() === '') {
        alert("Fill the details");
    }
    else {
        let userData = userInput.value.trim();
        userNameBox.innerHTML = userData;

        // Retrieve existing users from localStorage
        let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Add new user to the array
        existingUsers.push(userData);

        // Save updated array back to localStorage
        localStorage.setItem("users", JSON.stringify(existingUsers));

        // Update UI elements to reflect the added user

        userDetails.style.display = "none";
        userAddedPop_up.style.display = "block";
        btnAddUser.style.display = "none";
        userNameHeading.innerHTML = userData;
        userNameHeading.style.display = "block";


        setTimeout(() => {
            userAddedPop_up.style.display = "none";
        }, 1000);
    };
});


// Event listener for the "Quit Adding Details" button
btnQuitAddDetails.addEventListener("click", () => {
    userInput.value = '';
    userDetails.style.display = "none";
})

// Event listener for selecting the coding section
codingOption.addEventListener("click", () => {
    codingOption.style.border = "3px solid green"; // Highlight coding selection
    isCodingSelected = true;
});

// Event listener for the "Start Game" button
btnStartGame.addEventListener("click", () => {
    if (!isCodingSelected && !isMusicSelected && !isModernArtSelected) {
        alert("Please select a section first");
        return;
    }
    else {
        // Navigate to the quiz section and display a question
        secondPage.style.display = "none"; // Hide category/second page
        quizSection.style.display = "block"; // show quiz section

        showQuestion(); // Display the first question
        startTimer();
    }
});


// Function to display a question

function showQuestion() {
    const randomIndex = randomQuestions(); // Get a random question
    let ques = document.createElement('h2');
    ques.innerHTML = `${"Q :- "} ${questions[randomIndex].q}`;// Display question
    correctAns.push(questions[randomIndex].a); // Get the correct answers


    ques.classList = "questionHeading";
    questionBox.appendChild(ques);

    showOptions(questions[randomIndex].opt); // Display options.
};


// Function to display options for a question.
function showOptions(arry) {
    arry.forEach((option) => {
        let optPara = document.createElement("button");
        optPara.classList = "optHeading";
        optPara.innerHTML = option;
        optBox.append(optPara);

        optPara.addEventListener("click", function (e) {
            if (e.target.tagName === 'BUTTON') {
                optBox.querySelectorAll("button").forEach(btn => btn.disabled = true)
                e.target.disabled = false;
                curruntClickedAns.push(e.target.innerHTML); // Store user's answer.
            }
        });
    });
};

// Event handler for clicking an option.
// function clickedOpt(event) {
//     const selectedOption = event.target;
//     selectedOption.style.backgroundColor = "green";
//     selectedOption.style.color = "white";

//     curruntClickedAns.push(selectedOption.innerHTML); // Store user's answer.
// }


// Function to get a random question index.

function randomQuestions() {
    let storedQuestions = Math.floor(Math.random() * questions.length);
    if (questionsArry.includes(storedQuestions)) {
        return randomQuestions();
    }
    else {
        questionsArry.push(storedQuestions);
        return storedQuestions;
    };
};


// Event listener for the "Next Question" button.
btnNextQues.addEventListener("click", () => {
    if (questionsArry.length === questions.length) {
        // alert("All questions have been used.");

        quizInfoBox.style.display = "none";
        quizResultItmes.style.display = "block";  // Show the results.
        questionBox.innerHTML = '';
        optBox.innerHTML = '';
        questionsArry = [];
        clearInterval(timerInterval);
        showTime.innerHTML = "0"

        // Reset the questions array.
    }
    else {
        questionBox.innerHTML = '';
        optBox.innerHTML = '';
        showQuestion();  // Show the next question.
    };
});

// Event listener for the "Close Quiz" button.
btnCloseQuiz.addEventListener("click", () => {
    // Reset all elements and return to the second page.
    userInput.value = '';
    questionBox.innerHTML = '';
    optBox.innerHTML = '';
    questionsArry = [];
    codingOption.style.border = "";
    isCodingSelected = false;
    quizSection.style.display = "none";
    secondPage.style.display = "block";
    quizFlag = true;
});




closeResultBox.addEventListener("click", () => {
    userInput.value = '';
    userNameHeading.innerHTML = '';
    userNameHeading.style.display = "none";
    userNameBox.innerHTML = '';
    userNameBox.style.display = "none";
    questionBox.innerHTML = '';
    optBox.innerHTML = '';
    questionsArry = [];
    correctAns = [];
    curruntClickedAns = [];
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
    let score = 0;

    // Compare clicked answers with the correct answers
    curruntClickedAns.forEach((clickedAnswer, index) => {
        if (clickedAnswer === correctAns[index]) {
            score++;
        }
    });

    // Display the score in the result box
    finalResulBox.innerHTML = `Your Score: ${score} / ${correctAns.length}`;

    // Show the result box
    finalResulBox.style.display = "block";
});


btnPlayAgain.addEventListener("click", () => {
    quizResultItmes.style.display = "none";
    quizInfoBox.style.display = "block";

    questionsArry = [];
    correctAns = [];
    curruntClickedAns = [];

    questionBox.innerHTML = '';
    optBox.innerHTML = '';

    finalResulBox.style.display = "none"
    quizSection.style.display = "block";

    // Start with a new question
    startTimer();
    showQuestion();
});



btnScore.addEventListener("click", () => {
    hero_2_section.style.display = "none";
    scoreSection.style.display = "block";

    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); // This formats the date and time as a string

    // Display the current date and time in the dateBox
    dateBox.innerHTML = formattedDate;
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
            // Timer ends, handle what happens when the time is up
            clearInterval(timerInterval);
            questionsArry = [];
            correctAns = [];
            curruntClickedAns = [];
            questionBox.innerHTML = '';
            optBox.innerHTML = '';
            quizInfoBox.style.display = "none";
            quizResultItmes.style.display = "block";
        }
    }, 1000); // Decrease the timer every second
};


secondPageQuizBtn.addEventListener("click", () => {
    if (quizFlag === false) {
        alert("Quiz not availble");
        return;
    }
    else {
        questionsArry = [];
        correctAns = [];
        curruntClickedAns = [];
        clearInterval(timerInterval);
        secondPage.style.display = "none";
        quizSection.style.display = "block";
        showQuestion();
        startTimer();
    }
});
