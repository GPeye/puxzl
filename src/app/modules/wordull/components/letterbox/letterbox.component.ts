import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-letterbox',
  templateUrl: './letterbox.component.html',
  styleUrls: ['./letterbox.component.scss']
})
export class LetterboxComponent implements OnInit {
  @Input() value = '';
  constructor(public game: GameService) {
  }

  ngOnInit(): void {
  }

}
