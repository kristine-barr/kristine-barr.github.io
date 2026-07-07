// Even Listener 
document.querySelector("button").addEventListener("click", gradeQuiz);

// Question 4 Choices 
displayQ4Choices();

// Initialize score to 0
let score = 0;

// Attempts 
let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
    attempts = 0;
}
else {
    attempts = Number(attempts);
}

// Set Mark Image 
function setMarkImage(index, imageName, altText) {
    let markContainer = document.querySelector(`#markImg${index}`);
    markContainer.textContent = "";

    let img = document.createElement("img");
    img.src = `img/${imageName}`;
    img.alt = altText;
    markContainer.appendChild(img);
}

// Right Answer 
function rightAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Correct!";
    feedback.className = "bg-success text-white";
    setMarkImage(index, "checkmark.png", "Checkmark");
    score += 10;
}

// Wrong Answer 
function wrongAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Incorrect!";
    feedback.className = "bg-warning text-white";
    setMarkImage(index, "xmark.png", "X mark");
}

// Shuffle Array 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Display Q4 Choices 
function displayQ4Choices() {
    let q4ChoicesArray = ["Arizona", "Utah", "Colorado", "New Mexico"];
    shuffleArray(q4ChoicesArray);

    let choicesContainer = document.querySelector("#q4Choices");
    choicesContainer.textContent = "";

    for (let choice of q4ChoicesArray) {
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "q4";
        input.id = choice;
        input.value = choice;

        let label = document.createElement("label");
        label.htmlFor = choice;
        label.textContent = choice;

        choicesContainer.appendChild(input);
        choicesContainer.appendChild(label);
        choicesContainer.appendChild(document.createTextNode(" "));
    }
}

// Validation Function 
function isFormValid() {
    let isValid = true;
    let validationFdbk = document.querySelector("#validationFdbk");

    let q1Response = document.querySelector("#q1").value;
    let q2Response = document.querySelector("#q2").value;
    let q5Response = document.querySelector("#q5").value;
    let q6Response = document.querySelector("#q6").value;
    let q7Response = document.querySelector("#q7").value;
    let q9Response = document.querySelector("#q9").value;
    let q10Response = document.querySelector("#q10").value;

    let selectedQ4 = document.querySelector("input[name=q4]:checked");
    let selectedQ8 = document.querySelector("input[name=q8]:checked");

    if (q1Response === "") {
        isValid = false;
        validationFdbk.textContent = "Question 1 was not answered";
    }
    else if (q2Response === "") {
        isValid = false;
        validationFdbk.textContent = "Question 2 was not answered";
    }
    else if (!document.querySelector("#California").checked &&
        !document.querySelector("#Alaska").checked &&
        !document.querySelector("#Hawaii").checked &&
        !document.querySelector("#Toronto").checked &&
        !document.querySelector("#PuertoRico").checked) {
        isValid = false;
        validationFdbk.textContent = "Question 3 was not answered";
    }
    else if (selectedQ4 === null) {
        isValid = false;
        validationFdbk.textContent = "Question 4 was not answered";
    }
    else if (q5Response === "") {
        isValid = false;
        validationFdbk.textContent = "Question 5 was not answered";
    }
    else if (q6Response === "") {
        isValid = false;
        validationFdbk.textContent = "Question 6 was not answered";
    }
    else if (q7Response === "") {
        isValid = false;
        validationFdbk.textContent = "Question 7 was not answered";
    }
    else if (selectedQ8 === null) {
        isValid = false;
        validationFdbk.textContent = "Question 8 was not answered";
    }
    else if (q9Response === "") {
        isValid = false;
        validationFdbk.textContent = "Question 9 was not answered";
    }
    else if (q10Response === "") {
        isValid = false;
        validationFdbk.textContent = "Question 10 was not answered";
    }

    return isValid;
}

// Grade Quiz Function 
function gradeQuiz() {

    document.querySelector("#validationFdbk").textContent = "";

    // Check if valid 
    if (!isFormValid()) {
        return;
    }

    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q5Response = document.querySelector("#q5").value.toLowerCase();
    let q6Response = document.querySelector("#q6").value;
    let q7Response = document.querySelector("#q7").value.toLowerCase();
    let q9Response = document.querySelector("#q9").value.toLowerCase();
    let q10Response = document.querySelector("#q10").value;

    // Question 1 
    if (q1Response === "hawaii") {
        rightAnswer(1);
    }
    else {
        wrongAnswer(1);
    }

    // Question 2 
    if (q2Response === "ak") {
        rightAnswer(2);
    }
    else {
        wrongAnswer(2);
    }

    // Question 3
    if (document.querySelector("#California").checked &&
        document.querySelector("#Alaska").checked &&
        document.querySelector("#Hawaii").checked &&
        !document.querySelector("#Toronto").checked &&
        !document.querySelector("#PuertoRico").checked) {
        rightAnswer(3);
    }
    else {
        wrongAnswer(3);
    }

    // Question 4 
    let selectedQ4 = document.querySelector("input[name=q4]:checked");

    if (selectedQ4 !== null && selectedQ4.value === "Arizona") {
        rightAnswer(4);
    }
    else {
        wrongAnswer(4);
    }

    // Question 5 
    if (q5Response === "hawaii") {
        rightAnswer(5);
    }
    else {
        wrongAnswer(5);
    }

    // Question 6 
    if (q6Response === "wy") {
        rightAnswer(6);
    }
    else {
        wrongAnswer(6);
    }

    // Question 7 
    if (q7Response === "san francisco") {
        rightAnswer(7);
    }
    else {
        wrongAnswer(7);
    }

    // Question 8 
    let selectedQ8 = document.querySelector("input[name=q8]:checked");

    if (selectedQ8 !== null && selectedQ8.value === "Nevada") {
        rightAnswer(8);
    }
    else {
        wrongAnswer(8);
    }

    // Question 9
    if (q9Response === "new york") {
        rightAnswer(9);
    }
    else {
        wrongAnswer(9);
    }

    // Question 10
    if (q10Response === "ca") {
        rightAnswer(10);
    }
    else {
        wrongAnswer(10);
    }

    // Total Score 
    let totalScore = document.querySelector("#totalScore");
    totalScore.textContent = `Total Score: ${score}`;

    // Display in red if score is less than 80 
    if (score < 80) {
        totalScore.style.color = "red";
    }

    // Otherwise, display score in green
    else {
        totalScore.style.color = "green";
    }

    // Display a congratulatory message if the score is above 80 points 
    let congratsMsg = document.querySelector("#congratsMsg");

    if (score > 80) {
        congratsMsg.textContent = "Congratulations! You scored over 80 points!";
    }
    else {
        congratsMsg.textContent = "";
    }

    attempts++;
    document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
    localStorage.setItem("total_attempts", attempts);
}