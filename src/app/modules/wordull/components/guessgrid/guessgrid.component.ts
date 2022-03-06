import { Component, OnInit } from '@angular/core';
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
