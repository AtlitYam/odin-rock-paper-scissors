// Global vars
let currentRound = 0;
let computerScore = 0;
let playerScore = 0;

// Select elements
const currentRoundField = document.querySelector('.current-round')
const roundWinnerField = document.querySelector('.round-winner')
const computerScoreField = document.querySelector('.computer-score')
const playerScoreField = document.querySelector('.player-score')
const errorField = document.querySelector('.error')
const gameDiv = document.querySelector('.game')
const winnerDiv = document.querySelector('.winnerDiv')
const winnerText = document.querySelector('.winner')
const playButtons = document.querySelectorAll('.play-button')
const playMultipleGamesButton = document.querySelector('.multiple-games')
const playAgainButton = document.querySelector('.play-again-button')
const finalComputerScoreField = document.querySelector('.final-computer-score')
const finalPlayerScoreField = document.querySelector('.final-player-score')

// Add listeners
playButtons.forEach(button => button.addEventListener('click', function () {
    roundWinnerField.textContent = handleRoundResult(playRound(currentRound, this.dataset.choice))
    currentRoundField.textContent = ++currentRound;
}))

playMultipleGamesButton.addEventListener('click', function () {
    const numberOfRounds = Number(document.querySelector('.games-amount').value)
    console.log(numberOfRounds)
    if (!numberOfRounds || numberOfRounds < 1 || numberOfRounds > 50000) {
        console.log("error")
        errorField.textContent = 'Please only use numbers between 1 and 50000!'
        return // Invalid input
    }
    errorField.textContent = ''
    game(numberOfRounds)
})

playAgainButton.addEventListener('click', function () {
    currentRound = 0
    computerScore = 0
    playerScore = 0

    roundWinnerField.textContent = "Play the first round!"
    currentRoundField.textContent = 0
    computerScoreField.textContent = 0
    playerScoreField.textContent = 0

    gameDiv.style.display = "block"
    winnerDiv.style.display = "none"
})

// Main flow functions

function game(rounds) {
    for (let i = 1; i < rounds + 1; i++) {
        let roundResult = playRound(i);
        handleRoundResult(roundResult)
        currentRoundField.textContent = i
        console.log(playerScore)
        console.log(computerScore);
    }
    console.log(determineGameResult());
}

function playRound(round, playersPick) {
    console.log("Now playing round " + round);
    const computersPick = getComputersPick();
    if (!playersPick) {
        playersPick = getComputersPick();
    }

    console.log("Computer has picked: " + computersPick);
    console.log("Player has picked: " + playersPick);

    return determineRoundResult(playersPick, computersPick);
}

// Pick functions

function getComputersPick() {
    return convertPick(Math.floor(Math.random() * 3) + 1);
}

function getPlayersPick() {
    return prompt("Please enter your pick").toLowerCase();
}

function convertPick(computersPick) {
    switch (computersPick) {
        case 1:
            return "rock";
        case 2:
            return "paper";
        case 3:
            return "scissors";
    }
}

// Result functions

function isRoundTie(playersPick, computersPick) {
    return playersPick === computersPick;
}

function isPlayerWinsRound(playersPick, computersPick) {
    return playersPick === "rock" && computersPick === "scissors" ||
        playersPick === "scissors" && computersPick === "paper" ||
        playersPick === "paper" && computersPick === "rock";
}

function determineRoundResult(playersPick, computersPick) {
    if (isRoundTie(playersPick, computersPick)) {
        console.log("It's a tie! Round over.");
    } else if (isPlayerWinsRound(playersPick, computersPick)) {
        console.log("The player wins the round!");
        return "Player";
    } else {
        console.log("The computer wins the round!");
        return "Computer";
    }
}

function determineGameResult() {
    return playerScore > computerScore ? "The player wins the game!" : playerScore === computerScore ? "It's a tie! Game over." : "The computer wins the game!";
}

function handleRoundResult(roundResult) {
    let winner = ''
    roundResult === 'Player' ? winner = updatePlayerScore() : roundResult === 'Computer' ? winner = updateComputerScore() : winner = "The round was a tie!"

    if (playerScore === 5 || computerScore === 5) {
        gameDiv.style.display = "none"
        winnerText.textContent = playerScore > computerScore ? 'Player' : 'Computer'
        finalComputerScoreField.textContent = computerScore
        finalPlayerScoreField.textContent = playerScore
        winnerDiv.style.display = "block"
    }

    return winner
}

function updatePlayerScore() {
    playerScoreField.textContent = ++playerScore
    return 'Player'

}

function updateComputerScore() {
    computerScoreField.textContent = ++computerScore
    return 'Computer'
}