console.log("Hello World");

const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';

function computerPlay() {
    const selection = Math.floor(Math.random() * 3);
    switch (selection) {
        case 0:
            return rock;
        case 1:
            return paper;
        case 2:
            return scissors;
        default:
            return null;
    }
}

//returns the selection against which the argument passed wins.
function getWinsAgainst(selection) {
    if (selection === rock) {
        return scissors;
    } else if (selection === paper) {
        return rock;
    } else if (selection === scissors) {
        return paper;
    }
}


function getResultOfRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "It is a tie. YOU GOT LUCKY"
    } else if (getWinsAgainst(playerSelection) === computerSelection) {
        return "You Win, CELEBRATE WHILE IT LASTS...";
    } else if (getWinsAgainst(computerSelection) === playerSelection) {
        return "YOUU LOOOSSSEEEE. HOW DID YOU EVEN DREAM OF TRYING";
    }
}