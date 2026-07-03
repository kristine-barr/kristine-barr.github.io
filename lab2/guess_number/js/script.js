
// Event Listeners 
document.querySelector("#guessBtn").addEventListener("click", checkGuess); 
document.querySelector("#resetBtn").addEventListener("click", initializeGame);


// Global Variables 
let randomNumber; 
let attempts = 0; 
let wins = 0; 
let losses = 0; 

initializeGame(); 

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random number: " + randomNumber);
    
    attempts = 0; 

    // Hide Reset button 
    document.querySelector("#resetBtn").style.display = "none";

    // Show Guess button 
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus();    // adding focus to textbox 
    playerGuess.value = ""; // clearing the textbox

    // Clear feedback 
    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; 

    // Reset attempts left 
    let attemptsLeft = document.querySelector("#attemptsLeft");
    attemptsLeft.textContent = "Attempts left: 7";

    // Clear previous guesses 
    document.querySelector("#guesses").textContent = ""; 

}

function checkGuess() {

    // Get the feedback element
    let feedback = document.querySelector("#feedback");

    // Get the player's guess 
    let guess = Number(document.querySelector("#playerGuess").value);
    console.log("Player guess: " + guess);

    // Check if the input is a valid number 
    if(isNaN(guess)) {
        feedback.textContent = "Please enter a valid number.";
        feedback.style.color = "#FD5A46";
        return;
    }

    // Check if the guess is within the valid range 
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99"; 
        feedback.style.color = "#FB7DA8";
        return; 
    }

    // Increase the number of attempts 
    attempts++; 
    console.log("Attempts: " + attempts);

    // Update attempts left 
    let attemptsLeft = document.querySelector("#attemptsLeft"); 
    attemptsLeft.textContent = "Attempts Left: " + (7 - attempts);

    // Check if the player guessed correctly 
    if(guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "#00995E";
        feedback.style.fontWeight = "bold";
        
        // Increase win total 
        wins++; 

        // Update score 
        document.querySelector("#score").textContent = 
            "Wins: " + wins + "   |   Losses: " + losses;
        
        // End the game 
        gameOver();
    }
    else {

        // Display previous guesses 
        document.querySelector("#guesses").textContent += guess + " "; 

        // Check if the player has used all attempts 
        if(attempts == 7) {
            feedback.textContent = "Sorry, you lost!";
            feedback.style.color = "#FD5A46";
            feedback.style.fontWeight = "bold";
            
            // Increase loss total 
            losses++; 

            // Update score 
            document.querySelector("#score").textContent = 
                "Wins: " + wins + " | Losses: " + losses;
            
            // End the game
            gameOver();
        }

        // Give the player a hint 
        else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
            feedback.style.color = "orange"; 
        }
        else {
            feedback.textContent = "Guess was low";
            feedback.style.color = "orange";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn"); 

    // Hide Guess button 
    guessBtn.style.display = "none";  

    // Display Reset button 
    resetBtn.style.display = "inline"; 
}

