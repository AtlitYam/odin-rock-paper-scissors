// Main flow functions

function game(rounds) {
    let computerScore = 0;
    let userScore = 0;
    for (let i = 1; i < rounds + 1; i++) {
        let winner = playRound(i);
        winner === "user" ? userScore++ : winner === "computer" ? computerScore++ : undefined;
        console.log(userScore);
        console.log(computerScore);
    }
    console.log(determineGameResult(userScore, computerScore));
}

function playRound(round) {
    console.log("Now playing round " + round);
    const computersPick = getComputersPick();
    const usersPick = getUsersPick();

    console.log("Computer has picked: " + computersPick);
    console.log("Player has picked: " + usersPick);

    return determineRoundResult(usersPick, computersPick);
}

// Pick functions

function getComputersPick() {
    return convertPick(Math.floor(Math.random() * 3) + 1);
}

function getUsersPick() {
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

function isRoundTie(usersPick, computersPick) {
    return usersPick === computersPick;
}

function isUserWinsRound(usersPick, computersPick) {
    return usersPick === "rock" && computersPick === "scissors" ||
        usersPick === "scissors" && computersPick === "paper" ||
        usersPick === "paper" && computersPick === "rock";
}

function determineRoundResult(usersPick, computersPick) {
    if (isRoundTie(usersPick, computersPick)) {
        console.log("It's a tie! Round over.");
    } else if (isUserWinsRound(usersPick, computersPick)) {
        console.log("The player wins the round!");
        return "user";
    } else {
        console.log("The computer wins the round!");
        return "computer";
    }
}

function determineGameResult(userScore, computerScore) {
    return userScore > computerScore ? "The player wins the game!" : userScore === computerScore ? "It's a tie! Game over." : "The computer wins the game!";
}