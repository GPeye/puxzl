import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  constructor(private game:GameService) { }

  ngOnInit(): void {
  }

  keyPressed(key:string){
    this.game.addLetter(key);
  }
  
  delPressed(){
    this.game.deleteLetter();
  }

  enterPressed(){
    console.log("enter");
  }

}
