import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-end-dialog',
  templateUrl: './end-dialog.component.html',
  styleUrls: ['./end-dialog.component.scss']
})
export class EndDialogComponent implements OnInit {
  header = "Better luck next time!";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.won) {
      this.header = "You Win!"
    }
  }

  ngOnInit(): void {
  }

}
