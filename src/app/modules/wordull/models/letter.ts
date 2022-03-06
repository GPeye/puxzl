export class Letter {
    status: LetterStatus = LetterStatus.Blank;
    hasDuplicate: boolean = false;
    value: string = "";

    constructor(val: string) {
        this.value = val;
    }
}

export enum LetterStatus {
    Blank,
    NotFound,
    WrongPosition,
    CorrectPosition,
}