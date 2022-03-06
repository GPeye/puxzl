import { Component, OnInit, Input } from '@angular/core';
import { LetterStatus } from '../../models/letter';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-letterbox',
  templateUrl: './letterbox.component.html',
  styleUrls: ['./letterbox.component.scss']
})
export class LetterboxComponent implements OnInit {
  @Input() value = '';
  @Input() status: LetterStatus = LetterStatus.Blank;
  color = "";
  constructor(public game: GameService) {
  }

  ngOnInit(): void {
  }

  getColor(status: LetterStatus) {
    switch (this.status) {
      case LetterStatus.CorrectPosition:
        return this.color = "#31cc62";
        break;
      case LetterStatus.WrongPosition:
        return this.color = "#eb9a3d";
        break;
      case LetterStatus.NotFound:
        return this.color = "#adadac";
        break;
      default:
        return this.color = "white";
        break;
    }
  }

}
