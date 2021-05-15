console.log("Hello World");

const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';

function computerPlay() {
    let choice = Math.floor(Math.random() * 3);
    switch (choice) {
        case 0:
            return rock;
        case 1:
            return paper;
        case 2:
            return scissors;
        default:
            //should not happen ( so distribution should be more or less even)
            return rock;
    }
    return rock;
}