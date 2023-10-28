class Letter {
    constructor(letter) {
        this.letter = letter;
        this.guessed = false;
    }

    toString() {
        if (this.guessed) {
            return this.letter;
        } else {
            return "_";
        }
    }

    guess(letter) {
        if (this.letter === letter) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;
