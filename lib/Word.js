const Letter = require("./Letter");

class Word {
    constructor(word) {
        this.word = word;
        this.letters = [];
        this.word.split("").forEach(letter => {
            this.letters.push(new Letter(letter));
        });
    }

    getSolution() {
        return this.letters.map(letter => letter.getSolution()).join("");
    }

    toString() {
        return this.letters.join(" ");
    }

    guessLetter(letter) {
        let foundLetter = false;
        this.letters.forEach(l => {
            if (l.guess(letter)) {
                foundLetter = true;
            }
        });
        console.log("\n" + this + "\n");
        return foundLetter;
    }

    guessedCorrectly() {
        return this.letters.every(letter => letter.visible);
    }
}

module.exports = Word;
