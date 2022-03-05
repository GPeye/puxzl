import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(private game: GameService) {
    //game.targetWord = "bass";
    //game.guess = "star";
    //game.checkGuess();
  }

  ngOnInit(): void {
  }

}
