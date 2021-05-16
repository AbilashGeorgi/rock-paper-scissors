const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';

//randomly plays a weapon.
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

//play the game.
function game() {
    console.log("PREPARE TO DIE");
    let playerHealth = 5;
    let computerHealth = 10;
    while (playerHealth != 0 && computerHealth != 0) {

        //get the player input.
        let playerChoiceString = window.prompt("Choose your weapon");
        if (playerChoiceString == null) {
            //if player cancelled.
            break;
        }

        
        let playerChoice = getSelectionConst(playerChoiceString);

        if (playerChoice == null) {
            //if the player selects invalid options
            console.log("WRONG CHOICE. YOU\'LL HAVE TO DO BETTER THAN THAT.");
            continue;
        } else {
            //if correct choice is chosen.
            let result = getResultOfRound(playerChoice, computerPlay());
            switch (result) {
                case "tie":
                    console.log("It is a tie. YOU GOT LUCKY");
                    break;
                case "lose":
                    console.log("YOUU LOSE. WHAT DID YOU EXPECT");
                    playerHealth--;
                    break;
                case "win":
                    console.log("You Win, CELEBRATE WHILE IT LASTS...");
                    computerHealth--;
                    break;
                default:
                    break;
            }
        }

        //print remaining health after each round.
        console.log(`My health ${ computerHealth > 5 ? ", You have no hope hahahhahaha " : ""}  :   ${computerHealth}`);
        console.log(`Your health :   ${playerHealth}`);
    }

    if (playerHealth == 0) {
        //trash talk
        console.log('PATHETIC');
    } else if (computerHealth == 0) {
        //excuses
        console.log('The gods favour you');
    }
}

game();