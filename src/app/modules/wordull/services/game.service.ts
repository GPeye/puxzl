import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { LetterStatus } from '../models/letter';
import { Word } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  //Game Parameters
  NumberOfLetters = 4;
  NumberOfGuesses = 6;
  isogram: boolean = true;
  multiletterHint: boolean = false;

  //ActivGame Properties
  guess: string = "";
  targetWord: string = "gab";
  guesses: Word[] = [];
  currentGuess = 0;

  perfectLetters: string[] = [];
  incorrectLetters: string[] = [];
  correctLetters: string[] = [];
  duplicateLetters: string[] = [];

  _actionEmitter = new BehaviorSubject("");
  action = this._actionEmitter.asObservable();

  _keyboardColorEmitter = new BehaviorSubject({});
  keyboardColor = this._keyboardColorEmitter.asObservable();


  constructor(private http: HttpClient) {
    this.startThreeLetterGame();
    this.getWord(3, true);
  }

  getWord(length: number, isogram: boolean = true) {
    this.http.get('assets/words/threeIsograms.json')
      .subscribe((file) => {
        let words: string[] = file as string[];
        let randomIndex = Math.floor(Math.random() * (words.length - 1) - 1);
        console.log(words[randomIndex]);
        this.targetWord = words[randomIndex];
      });
  }

  startThreeLetterGame() {
    this.NumberOfLetters = 3;
    this.NumberOfGuesses = 6;
    this.initGuesses();
  }

  startFourLetterGame() {
    this.NumberOfLetters = 4;
    this.NumberOfGuesses = 6;
    this.initGuesses();
  }

  addLetter(letter: string) {
    if (this.guesses[this.currentGuess].length() < this.NumberOfLetters) {
      this.guesses[this.currentGuess].addLetter(letter);
      console.log(this.guesses[this.currentGuess]);
      this._actionEmitter.next("d");
    } else {
      console.log("too many letters");
    }
  }

  deleteLetter() {
    this.guesses[this.currentGuess].deleteLetter();
    console.log(this.guesses[this.currentGuess]);
  }

  checkGuess() {
    let guessword = this.guesses[this.currentGuess].getWord();
    if (guessword.length != this.NumberOfLetters) {
      console.log("Not enough letters");
      return;
    }
    for (let i = 0; i < this.NumberOfLetters; i++) {
      let letter = this.guesses[this.currentGuess].letters[i];
      let letterPosition = this.targetWord.indexOf(letter.value);

      if (this.isogram && this.multiletterHint && this.hasMultipleOfLetter(this.targetWord, letter.value)) {
        this.duplicateLetters.push(letter.value);
        letter.hasDuplicate = true
      }

      if (letterPosition == -1) {
        this.incorrectLetters.push(letter.value);
        letter.status = LetterStatus.NotFound;
        this._keyboardColorEmitter.next({letter:letter.value, status: LetterStatus.NotFound});
      } else if (letterPosition == i) {
        this.perfectLetters.push(letter.value);
        letter.status = LetterStatus.CorrectPosition;
        this._keyboardColorEmitter.next({letter:letter.value, status: LetterStatus.CorrectPosition});
      } else {
        this.correctLetters.push(letter.value);
        letter.status = LetterStatus.WrongPosition;
        this._keyboardColorEmitter.next({letter:letter.value, status: LetterStatus.WrongPosition});
      }
    }
    this.currentGuess += 1;

    this._actionEmitter.next("");
  }

  private getCurrentGuessWord(): string {
    return this.guesses[this.currentGuess].getWord();
  }

  private hasMultipleOfLetter(word: string, letter: string): boolean {
    let match = word.match(new RegExp(letter, 'gi'));
    return (match && match.length > 1) || false;
  }

  private initGuesses() {
    this.guesses = [];
    for (let i = 0; i < this.NumberOfGuesses; i++) {
      this.guesses.push(new Word());
    }
  }
}
