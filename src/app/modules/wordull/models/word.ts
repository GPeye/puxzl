import { Letter } from "./letter";

export class Word {
    letters: Letter[] = [];

    constructor() {
    }

    setWord(word: string) {
        this.letters = [];
        for (let letter in word.split('')) {
            this.letters.push(new Letter(letter));
        }
    }

    getWord(): string {
        let l: string[] = [];
        this.letters.forEach(x => {
            l.push(x.value);
        });
        return l.join("");
    }

    addLetter(l: string) {
        this.letters.push(new Letter(l));
    }

    deleteLetter() {
        this.letters.pop();
    }

    length() {
        return this.letters.length;
    }
}