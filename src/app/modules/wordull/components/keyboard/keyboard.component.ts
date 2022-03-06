import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { LetterStatus } from '../../models/letter';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  constructor(@Inject(DOCUMENT) document:Document, private game:GameService) { }

  ngOnInit(): void {
    this.game.keyboardColor.subscribe( (key:any) => {
      let el = document.getElementById(key.letter);
      if(el){
        if(key.status ==LetterStatus.NotFound){
          el.style.backgroundColor = "#adadac";
        }else if(key.status == LetterStatus.WrongPosition){
          el.style.backgroundColor = "#eb9a3d";
        }else if(key.status == LetterStatus.CorrectPosition){
          el.style.backgroundColor = "#31cc62";
        }
      }
        
      
      
    });
  }

  keyPressed(key:string){
    this.game.addLetter(key);
  }
  
  delPressed(){
    this.game.deleteLetter();
  }

  enterPressed(){
    console.log("enter");
    this.game.checkGuess();
  }

}
