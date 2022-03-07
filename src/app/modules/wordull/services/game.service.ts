import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { LetterStatus } from '../models/letter';
import { Word } from '../models/word';
import * as confetti from 'canvas-confetti';
import { MatDialog } from '@angular/material/dialog';
import { EndDialogComponent } from '../components/end-dialog/end-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  //Game Parameters
  NumberOfLetters = 0;
  NumberOfGuesses = 0;
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


  constructor(private http: HttpClient, 
      public dialog: MatDialog,
      private snackbar:MatSnackBar) {
    this.startNewGame(4);
  }

  getWord(length: number, isogram: boolean = true) {
    let url="assets/words/";
    switch (length){
      case 3:
        url+="threeIsograms.json";
        break;
      case 4:
        url+="fourIsograms.json";
        break;
      default:
        break;
    }
    this.http.get(url)
      .subscribe((file) => {
        let words: string[] = file as string[];
        let randomIndex = Math.floor(Math.random() * (words.length - 1) - 1);
        console.log(words[randomIndex]);
        this.targetWord = words[randomIndex];
      });
  }

  startNewGame(numberOfLetters:number=this.NumberOfLetters){
    this._keyboardColorEmitter.next("reset");
    this.currentGuess=0;
    switch(numberOfLetters){
      case 3:
        this.startThreeLetterGame();
        break;
      case 4:
        this.startFourLetterGame();
        break;
      default:
        this.startFourLetterGame();
        break;
    }
  }

  startThreeLetterGame() {
    this.NumberOfLetters = 3;
    this.NumberOfGuesses = 6;
    this.initGuesses();
    this.getWord(3, true);
    this.isPlaying = true;
  }

  startFourLetterGame() {
    this.NumberOfLetters = 4;
    this.NumberOfGuesses = 6;
    this.initGuesses();
    this.getWord(4, true);
    this.isPlaying = true;
  }

  addLetter(letter: string) {
    if (this.isPlaying) {
      if (this.guesses[this.currentGuess].length() < this.NumberOfLetters) {
        this.guesses[this.currentGuess].addLetter(letter);
      } else {
        console.log("too many letters");
      }
    }
  }

  deleteLetter() {
    if (this.isPlaying) {
      this.guesses[this.currentGuess].deleteLetter();
    }
  }

  checkGuess() {
    if (this.isPlaying) {
      let guessword = this.guesses[this.currentGuess].getWord();
      if (guessword.length != this.NumberOfLetters) {
        this.snackbar.open("Not enough letters","",{
          verticalPosition: 'top',
          panelClass: ['my-snackbar'],
          duration: 3000
        });
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
        this.end();
        this.confetti();
      } else if (this.currentGuess == this.NumberOfGuesses) {
        this.isPlaying = false;
        this.end();
      }
    }
  }

  private end() {
    const dialog = this.dialog.open(EndDialogComponent, {
      autoFocus: "first-header",
      data: { won: this.hasWon, target: this.targetWord },
      width: "100vw",
      height: "100vh",
      maxWidth: "400px",
      maxHeight: "300px"
    });

    dialog.afterClosed().subscribe(v => {
      if(v == "playagain"){
        this.startNewGame();
      }
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

  private confetti() {
    var myCanvas = document.getElementById("confetti") as HTMLCanvasElement;
    if (typeof (myCanvas) != 'undefined' && myCanvas != null) {
      var myConfetti = confetti.create(myCanvas, { resize: true });
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
    } else {
      myCanvas = document.createElement('canvas');
      myCanvas.classList.add('confetti');
      myCanvas.id = "confetti";
      document.body.appendChild(myCanvas);
      var myConfetti = confetti.create(myCanvas, {
        resize: true,
        //useWorker: true
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
