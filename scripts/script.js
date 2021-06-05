const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';
let playerHealth = 0;
let computerHealth = 0;

//randomly plays a weapon.
function computerPlay() {
    resetComputerChoice();
    const selection = Math.floor(Math.random() * 3);
    switch (selection) {
        case 0:
            displayComputerChoice(rock);
            return rock;
        case 1:
            displayComputerChoice(paper);
            return paper;
        case 2:
            displayComputerChoice(scissors);
            return scissors;
        default:
            return null;
    }
}

//display functions for the computer choice
function resetComputerChoice() {
    const button = document.querySelector(`.computer-button.highlight`);
    if (button === null) return;
    button.classList.remove('highlight');
}
function displayComputerChoice(choice) {
    const button = document.querySelector(`.computer-button.${choice}`);
    button.classList.add('highlight');
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

//find out who won the round.
function getResultOfRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "tie";
    } else if (getWinsAgainst(playerSelection) === computerSelection) {
        return "win";
    } else if (getWinsAgainst(computerSelection) === playerSelection) {
        return "lose";
    }
}

//maps input to the constants.
function getSelectionConst(selection) {
    switch (selection.toLowerCase()) {
        case 'rock':
            return rock;
        case 'paper':
            return paper;
        case 'scissors':
            return scissors;
        default:
            return null;
    }
}

//fade text into the board.
//facing issues with synchronisation
function fadeIn(text) {
    const words = text.split(" ");
    const board = document.querySelector('.container.board');
    for (let i in words) {
        const newSpan = document.createElement('span');
        newSpan.innerHTML = `&nbsp${words[i]}`;
        board.appendChild(newSpan);
    }
}

//initialise the board
function clearBoard() {
    const board = document.querySelector('.board');
    board.innerHTML = '<span>&nbsp;</span>';
}

function populateHealthBar(character, health) {
    const healthDiv = document.querySelector(`.${character} .health`);
    for (let i=0; i<health; i++) {
        healthDiv.appendChild(getNewHealthChunkElement());
    }
}

function getNewHealthChunkElement() {
    const newHealthChunkElement = document.createElement('div');
    newHealthChunkElement.classList.add('health-chunk');
    newHealthChunkElement.classList.add('active');
    return newHealthChunkElement;
}

function removeHealthChunk(character) {
    const healthChunk = document.querySelector(`.${character} .health-chunk.active`);
    healthChunk.classList.remove('active');
    healthChunk.classList.add('inactive');
}

//trying to solve sync issues.
//class level var maybe better but that also would just be a bandaid.
function canUseBoard() {
    const board = document.querySelector('.board');
    if (board.innerHTML === '<span>&nbsp;</span>') return true;
    else return false;
}

function initialiseGame() {
    fadeIn("CHOOSE YOUR WEAPON");
    playerHealth = 5;
    computerHealth = 8;
    populateHealthBar('player', playerHealth);
    populateHealthBar('computer', computerHealth);

    const playerButtons = document.querySelectorAll('button.player-button');
    playerButtons.forEach((button) => {
        button.addEventListener('click', function(e) {playChoice(getSelectionConst(e.target.id));});
    });
}

function playChoice(playerChoice) {
    clearBoard();
    let result = getResultOfRound(playerChoice, computerPlay());
    switch (result) {
        case "tie":
            break;
        case "lose":
            playerHealth--;
            removeHealthChunk('player');
            break;
        case "win":
            computerHealth--;
            removeHealthChunk('computer');
            break;
        default:
            break;
    }

    if (playerHealth == 0) {
        //trash talk
        fadeIn('PATHETIC');
        endGame();
        return;
    } else if (computerHealth == 0) {
        //excuses
        fadeIn('The gods favour you');
        endGame();
        return;
    }

    switch (result) {
        case "tie":
            fadeIn("It is a tie. YOU GOT LUCKY");
            break;
        case "lose":
            fadeIn("YOUU LOSE. WHAT DID YOU EXPECT");
            break;
        case "win":
            fadeIn("You Win, CELEBRATE WHILE IT LASTS...");
            break;
        default:
            break;
    }
}

initialiseGame();

function endGame() {
    const playerButtons = document.querySelectorAll('button.player-button');
    playerButtons.forEach((button) => {
        button.disabled = true;
    });
}