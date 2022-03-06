import { Component, OnInit, Input } from '@angular/core';
import { Word } from '../../models/word';
import { GameService } from '../../services/game.service';
import { LetterStatus } from '../../models/letter';

@Component({
  selector: 'app-wordrow',
  templateUrl: './wordrow.component.html',
  styleUrls: ['./wordrow.component.scss']
})
export class WordrowComponent implements OnInit {
  @Input() word: Word = new Word();
  fillerWord = new Word();
  t = LetterStatus.CorrectPosition;

  constructor(private game: GameService) {
  }

  ngOnInit(): void {
    this.padWord();
  }

  padWord() {
    this.fillerWord = new Word();
    if (this.word.length() < this.game.NumberOfLetters) {
      let diff = this.game.NumberOfLetters - this.word.length();
      for (let i = 0; i < diff; i++) {
        this.fillerWord.addLetter("");
      }
    }
    return this.fillerWord;
  }

}
