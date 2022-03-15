import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Word } from '../../models/word';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-guessgrid',
  templateUrl: './guessgrid.component.html',
  styleUrls: ['./guessgrid.component.scss']
})
export class GuessgridComponent implements OnInit {

  constructor(public game: GameService) {
  }

  ngOnInit(): void {
    window.addEventListener("resize", this.sizeGameboard.bind(this));
  }

  ngAfterViewInit(): void {
    this.sizeGameboard();
  }

  sizeGameboard() {
    var e2 = document.querySelector("#scaleable-wrapper-gameboard") as HTMLElement;
    var e = document.querySelector(".game-board") as HTMLElement;
    var elheight = e.clientHeight;
    var elwidth = e.clientWidth;

    var scale, origin = {};
    scale = Math.min(e2.clientWidth / elwidth, e2.clientHeight / elheight);

    e.style.transform = "scale(" + scale + ")";
  }

  padWord(word: Word): string {
    let w = word.getWord();
    if (w.length < this.game.NumberOfLetters) {
      let padding = this.game.NumberOfLetters - w.length;
      return w + Array.of(" ".repeat(padding)).join();
    }
    return w;
  }

}
