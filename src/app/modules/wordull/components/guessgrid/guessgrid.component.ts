import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-guessgrid',
  templateUrl: './guessgrid.component.html',
  styleUrls: ['./guessgrid.component.scss']
})
export class GuessgridComponent implements OnInit {

  constructor(public game: GameService) {
    console.log(game.guesses.length)
  }

  ngOnInit(): void {
  }

}
