import { questions } from "./questions.js";
// console.log(questions);
let firstPage = document.querySelector("#page_first")
// let btnUser = document.querySelector(".userBtn");
let btnAddUser = document.querySelector(".userBtn button");
let userNameHeading = document.querySelector(".userBtn h2");
let btnStartQuiz = document.querySelector(".startBtn");
let creatUserPop_up = document.querySelector(".addUser_pop_up");
let userAddedPop_up = document.querySelector(".createdUser_pop_up");
let userDetails = document.querySelector(".addUserInfo");
let userInput = document.querySelector(".addUserInfo input")
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
let closeQuiz = document.querySelector("#quit_quiz");
let quiInfoBox = document.querySelector(".ques_opt_box");
let quizResultItmes = document.querySelector("#quiz_result_box ");
let closeResultBox = document.querySelector("#quit_quiz_result");
let finalResulBox = document.querySelector(".result_heading p");
let showFinalResult = document.querySelector("#getResultBtn");



let isMusicSelected = false;
let isModernArtSelected = false;
let isCodingSelected = false;

let questionsArry = [];

let correctAns = [];
let curruntClickedAns = [];



btnStartQuiz.addEventListener("click", () => {
    if (userInput.value.trim() === '') {
        creatUserPop_up.style.display = 'block';

        setTimeout(() => {
            creatUserPop_up.style.display = "none";
        }, 1000);
    }
    else {
        firstPage.style.display = "none";
        secondPage.style.display = "block";
    }
});

btnAddUser.addEventListener("click", () => {
    userDetails.style.display = "block";
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
    codingOption.style.border = "3px solid green";
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
        secondPage.style.display = "none";
        quizSection.style.display = "block";
        showQuestion();
    }
});


// Function to display a question

function showQuestion() {
    const randomIndex = randomQuestions();
    let ques = document.createElement('h2');
    ques.innerHTML = `${"Q :- "} ${questions[randomIndex].q}`;
    correctAns = questions[randomIndex].a; // Get the correct answers


    ques.classList = "questionHeading";
    questionBox.appendChild(ques);

    showOptions(questions[randomIndex].opt);
};


// Function to display options for a question
function showOptions(arry) {
    arry.forEach((option) => {
        let optPara = document.createElement("p");
        optPara.classList = "optHeading";
        optPara.innerHTML = option;
        optBox.append(optPara);

        optPara.addEventListener("click", clickedOpt);
    })

};

// Event handler for clicking an option
function clickedOpt(event) {
    const selectedOption = event.target;
    selectedOption.style.backgroundColor = "green";
    selectedOption.style.color = "white";
    curruntClickedAns.push(selectedOption.innerHTML);  // Add the selected option to the user's answers
}


// Function to get a random question index

function randomQuestions() {
    let storedQuestions = Math.floor(Math.random() * questions.length);
    if (questionsArry.includes(storedQuestions)) {
        return randomQuestions();
    }
    else {
        questionsArry.push(storedQuestions);
        return storedQuestions;
    }
};


// Event listener for the "Next Question" button
btnNextQues.addEventListener("click", () => {
    if (questionsArry.length === questions.length) {
        // alert("All questions have been used.");

        quiInfoBox.style.display = "none";
        quizResultItmes.style.display = "block";  // Show the results
        questionBox.innerHTML = '';
        optBox.innerHTML = '';
        questionsArry = []; // Reset the questions array
    }
    else {
        questionBox.innerHTML = '';
        optBox.innerHTML = '';
        showQuestion();  // Show the next question
    }
});

// Event listener for the "Close Quiz" button
closeQuiz.addEventListener("click", () => {
    // Reset various elements and flags to their initial state
    userInput.value = '';
    userNameHeading.innerHTML = '';
    userNameHeading.style.display = "none"
    userNameBox.innerHTML = '';
    userNameBox.style.display = "none"
    questionBox.innerHTML = '';
    optBox.innerHTML = '';
    questionsArry = [];
    codingOption.style.border = "";
    isCodingSelected = false;
    quizSection.style.display = "none";
    btnAddUser.style.display = "block"
    firstPage.style.display = "block";
    btnStartQuiz;

});




closeResultBox.addEventListener("click", () => {
    userInput.value = '';
    userNameHeading.innerHTML = '';
    userNameHeading.style.display = "none"
    userNameBox.innerHTML = '';
    userNameBox.style.display = "none"
    questionBox.innerHTML = '';
    optBox.innerHTML = '';
    questionsArry = [];
    codingOption.style.border = "";
    isCodingSelected = false;
    btnAddUser.style.display = "block"
    firstPage.style.display = "block";
    quiInfoBox.style.display = "block";
    quizResultItmes.style.display = "none"
    quizSection.style.display = "none";

});


// Event listener for the "Show Final Result" button
showFinalResult.addEventListener("click", () => {
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
    finalResulBox.style.display = "block"
});














