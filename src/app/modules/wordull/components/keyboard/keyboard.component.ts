import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { LetterStatus } from '../../models/letter';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  constructor(@Inject(DOCUMENT) document: Document, private game: GameService) { }

  ngOnInit(): void {
    window.addEventListener("resize", this.sizeKeyboard.bind(this));

    this.game.keyboardColor.subscribe((key: any) => {
      if (key == "reset")
        this.resetKeyboard();
      let el = document.getElementById(key.letter);
      if (el) {
        if (key.status == LetterStatus.NotFound) {
          el.style.backgroundColor = "#d1d1d1";
        } else if (key.status == LetterStatus.WrongPosition) {
          el.style.backgroundColor = "#dbb571";
        } else if (key.status == LetterStatus.CorrectPosition) {
          el.style.backgroundColor = "#538D4E";
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.sizeKeyboard();
  }

  sizeKeyboard() {
    var e2 = document.querySelector("#scaleable-wrapper-keyboard") as HTMLElement;
    var e = document.querySelector(".keyboard-cont") as HTMLElement;
    var elheight = e.clientHeight;
    var elwidth = e.clientWidth;

    var scale, origin = {};
    scale = Math.min(e2.clientWidth / elwidth, e2.clientHeight / elheight);

    e.style.transform = "scale(" + scale + ")";
  }

  resetKeyboard() {
    let keybuttons = document.querySelectorAll('.keyboard-button');
    keybuttons.forEach(box => {
      (box as HTMLElement).style.backgroundColor = 'white';
    });
  }

  keyPressed(key: string) {
    this.game.addLetter(key);
  }

  delPressed() {
    this.game.deleteLetter();
  }

  enterPressed() {
    console.log("enter");
    this.game.checkGuess();
  }

}
