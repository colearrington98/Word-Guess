const inquirer = require('inquirer');
const chalk = require('chalk');
const Word = require('./Word');
const words = require('./words');

// Game constructor function
class Game {
    constructor() {
        this.guessesLeft = 0;
    }

// Start game function
play () {
    this.guessesLeft = 10;
    this.nextWord();
}

// Next word function
nextWord() {
    const randWord = words[Math.floor(Math.random() * words.length)];
    this.currentWord = new Word(randWord);
    console.log('\n' + this.currentWord + '\n');
    this.makeGuess();
}

// Make guess function
makeGuess() {
    this.askForLetter().then(() => {
        if (this.guessesLeft < 1) {
            console.log(
                `No guesses left! Word was: "${this.currentWord.getSolution()}".\n`
            );
            this.askToPlayAgain();
        } else if (this.currentWord.guessedCorrectly()) {
            console.log(`You got it right! Next word!`);
            this.guessesLeft = 10;
            this.nextWord();
        } else {
            this.makeGuess();
        }
    });
}

// Ask to play again function
askToPlayAgain() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'choice',
                message: 'Play Again?'
            }
        ])
        .then(val => {
            if (val.choice) {
                this.play();
            } else {
                this.quit();
            }
        });
}

// Ask for letter function
askForLetter() {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'choice',
                message: 'Guess a letter!',
                validate: val => /[a-z1-9]/gi.test(val)
            }
        ])
        .then(val => {
            const didGuessCorrectly = this.currentWord.guessLetter(val.choice);
            if (didGuessCorrectly) {
                console.log(chalk.green('\nCORRECT!!!\n'));

            } else {
                this.guessesLeft--;
                console.log(chalk.red('\nINCORRECT!!!\n'));
                console.log(this.guessesLeft + ' guesses remaining!!!\n');
            }
        });
}

// Quit function
quit() {
    console.log('\nGoodbye!');
    process.exit(0);
}
}

module.exports = Game;

