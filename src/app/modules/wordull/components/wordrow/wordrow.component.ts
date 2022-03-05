import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-wordrow',
  templateUrl: './wordrow.component.html',
  styleUrls: ['./wordrow.component.scss']
})
export class WordrowComponent implements OnInit {
  letters: Array<string> = [];

  constructor(private game: GameService) {
    for (let i = 0; i < this.game.NumberOfLetters; i++) {
      this.letters.push("");
    }
  }

  ngOnInit(): void {
  }

}
