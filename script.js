const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");

const minInput = document.getElementById("minInput");
const maxInput = document.getElementById("maxInput");

const rangeText = document.getElementById("rangeText");
const newGameButton = document.getElementById("newGameButton");
const applyButton = document.getElementById("applyButton");

let minNumber = 1;
let maxNumber = 100;
let secretNumber;
let attempts = 0;
let gameOver = false;

function startGame() {
    secretNumber = Math.floor(
        Math.random() * (maxNumber - minNumber + 1)
    ) + minNumber;
    attempts = 0;
    gameOver = false;
    attemptsText.textContent = attempts;
    guessInput.value = "";
    guessInput.min = minNumber;
    guessInput.max = maxNumber;
    rangeText.textContent =
        `Guess a number between ${minNumber} and ${maxNumber}`;
    message.textContent = "Good luck!";
    message.className = "info";
    guessInput.disabled = false;
    guessForm.querySelector("button").disabled = false;
}

guessForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (gameOver) {
        return;
    }
    const guess = Number(guessInput.value);
    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < minNumber ||
        guess > maxNumber
    ) {
        message.textContent =
            `Enter a whole number between ${minNumber} and ${maxNumber}`;

        message.className = "error";
        return;
    }
    attempts++;
    attemptsText.textContent = attempts;

    if (guess > secretNumber) {
        message.textContent = "Too high! Try a smaller number.";
        message.className = "error";
    } else if (guess < secretNumber) {
        message.textContent = "Too low! Try a bigger number.";
        message.className = "error";
    } else {
        message.textContent =
            `Correct! You won in ${attempts} attempts!`;
        message.className = "success";
        gameOver = true;
        guessInput.disabled = true;
        guessForm.querySelector("button").disabled = true;
    }
    guessInput.value = "";
    if (!gameOver) {
        guessInput.focus();
    }
});

newGameButton.addEventListener("click", function() {
    startGame();
});

applyButton.addEventListener("click", function() {
    const newMin = Number(minInput.value);
    const newMax = Number(maxInput.value);
    if (
        minInput.value.trim() === "" ||
        maxInput.value.trim() === "" ||
        !Number.isInteger(newMin) ||
        !Number.isInteger(newMax) ||
        newMin >= newMax
    ) {
        message.textContent =
            "Please enter valid boundaries. Minimum must be smaller than maximum.";

        message.className = "error";
        return;
    }
    minNumber = newMin;
    maxNumber = newMax;
    startGame();
});

startGame();