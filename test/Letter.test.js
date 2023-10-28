const Letter = require("../lib/Letter");

describe("Letter", () => {
    it('Character thata are digits or letters should not be visible', () => {
        export(new Letter('j')).toBe(false);
    });
    