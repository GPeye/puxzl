import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  isogram:boolean=true;
  multiletterHint:boolean=false;
  guess:string="";
  targetWord:string="grub";
  numberOfGuesses=6;
  numberOfLetters=4;
  guesses:string[]=[""];
  currentGuess=0;


  constructor() { }

  addLetter(letter:string) {
    if(this.guesses[this.currentGuess].length < this.numberOfLetters){
      this.guesses[this.currentGuess]+=letter;
      console.log(this.guesses[this.currentGuess]);
    }else{
      console.log("too many letters");
    }
  }

  deleteLetter() {
    this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(0, -1);
    console.log(this.guesses[this.currentGuess]);
  }

  checkGuess(){
    let guessword = this.guesses[this.currentGuess];
    if(guessword.length != this.numberOfLetters){
      console.log("Not enough letters");
      return;
    }
    for(let i=0; i<this.numberOfLetters; i++){
      let letter = guessword[i];
      let letterPosition = this.targetWord.indexOf(letter);

      if(letterPosition == -1){
        //letter not found
        console.log(letter + " not found");
      }else if(letterPosition == i){
        //letter found and in correct position
        if(this.isogram && this.multiletterHint && this.hasMultipleOfLetter(this.targetWord,letter)){
          console.log(letter + " is in the correct position and found multiple times");
        }else {
          console.log(letter + " is in the correct position");
        }
      }else{
        //letter found but not in correct position
        if(this.isogram && this.multiletterHint)
        {
          if(this.hasMultipleOfLetter(this.targetWord,letter)){
            // multiple of this letter
            console.log(letter + " found multiple times");
          }
        }else{
          // single of this letter
          console.log(letter + " found but incorrect position");
        }
      }
    }
    this.currentGuess+=1;
    this.guesses.push("");
  }

  private getCurrentGuessWord(): string{
    return this.guesses[this.currentGuess];
  }

  private hasMultipleOfLetter(word:string, letter:string):boolean{
    let match = word.match(new RegExp(letter,'gi'));
    return (match && match.length>1) || false;
  }
}
