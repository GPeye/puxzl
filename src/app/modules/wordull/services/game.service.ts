import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { LetterStatus } from '../models/letter';
import { Word } from '../models/word';
import * as confetti from 'canvas-confetti';
import { MatDialog } from '@angular/material/dialog';
import { EndDialogComponent } from '../components/end-dialog/end-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  //Game Parameters
  NumberOfLetters = 4;
  NumberOfGuesses = 6;
  isogram: boolean = true;
  multiletterHint: boolean = false;

  //ActivsGame Properties
  targetWord: string = "gab";
  guesses: Word[] = [];
  currentGuess = 0;
  isPlaying: boolean = false;
  hasWon: boolean = false;

  _keyboardColorEmitter = new BehaviorSubject({});
  keyboardColor = this._keyboardColorEmitter.asObservable();

  myCanvas: any;


  constructor(private http: HttpClient, public dialog: MatDialog) {
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
    this.isPlaying = true;
  }

  startFourLetterGame() {
    this.NumberOfLetters = 4;
    this.NumberOfGuesses = 6;
    this.initGuesses();
    this.isPlaying = true;
  }

  addLetter(letter: string) {
    if (this.isPlaying) {
      if (this.guesses[this.currentGuess].length() < this.NumberOfLetters) {
        this.guesses[this.currentGuess].addLetter(letter);
        console.log(this.guesses[this.currentGuess]);
      } else {
        console.log("too many letters");
      }
    }
  }

  deleteLetter() {
    if (this.isPlaying) {
      this.guesses[this.currentGuess].deleteLetter();
      console.log(this.guesses[this.currentGuess]);
    }
  }

  checkGuess() {
    if (this.isPlaying) {
      let guessword = this.guesses[this.currentGuess].getWord();
      if (guessword.length != this.NumberOfLetters) {
        console.log("Not enough letters");
        return;
      }
      for (let i = 0; i < this.NumberOfLetters; i++) {
        let letter = this.guesses[this.currentGuess].letters[i];
        let letterPosition = this.targetWord.indexOf(letter.value);

        if (this.isogram && this.multiletterHint && this.hasMultipleOfLetter(this.targetWord, letter.value)) {
          letter.hasDuplicate = true
        }

        if (letterPosition == -1) {
          letter.status = LetterStatus.NotFound;
          this._keyboardColorEmitter.next({ letter: letter.value, status: LetterStatus.NotFound });
        } else if (letterPosition == i) {
          letter.status = LetterStatus.CorrectPosition;
          this._keyboardColorEmitter.next({ letter: letter.value, status: LetterStatus.CorrectPosition });
        } else {
          letter.status = LetterStatus.WrongPosition;
          this._keyboardColorEmitter.next({ letter: letter.value, status: LetterStatus.WrongPosition });
        }
      }
      this.currentGuess += 1;

      if (guessword == this.targetWord) {
        this.isPlaying = false;
        this.hasWon = true;
        this.win();
        this.privateConfetti();
      } else if (this.currentGuess == this.NumberOfGuesses) {
        this.isPlaying = false;
        window.alert("You Lose :(\nThe word was: " + this.targetWord);
        console.log("you lose");
      }
    }
  }

  private win() {
    this.dialog.open(EndDialogComponent, {
      autoFocus: "first-header",
      data: { won: this.hasWon, target: this.targetWord },
    });
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

  privateConfetti() {
    var myCanvas = document.getElementById("confetti") as HTMLCanvasElement;
    if (typeof (myCanvas) != 'undefined' && myCanvas != null) {
      var myConfetti = confetti.create(myCanvas, { resize: true });
    } else {
      var myCanvas = document.createElement('canvas');
      myCanvas.classList.add('confetti');
      myCanvas.id = "confetti";
      document.body.appendChild(myCanvas);
      var myConfetti = confetti.create(myCanvas, {
        resize: true,
        useWorker: true
      });
      myConfetti({
        particleCount: 200,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      myConfetti({
        particleCount: 200,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }
  }
}
