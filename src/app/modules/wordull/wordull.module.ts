import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordullRoutingModule } from './wordull-routing.module';
import { DefaultComponent } from './pages/default/default.component';
import { LetterboxComponent } from './components/letterbox/letterbox.component';
import { WordrowComponent } from './components/wordrow/wordrow.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { GuessgridComponent } from './components/guessgrid/guessgrid.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { OptionsDialogComponent } from './components/options-dialog/options-dialog.component';
import { EndDialogComponent } from './components/end-dialog/end-dialog.component';

@NgModule({
  declarations: [
    DefaultComponent,
    LetterboxComponent,
    WordrowComponent,
    KeyboardComponent,
    GuessgridComponent,
    OptionsDialogComponent,
    EndDialogComponent,
  ],
  imports: [
    CommonModule,
    WordullRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule

  ]
})
export class WordullModule { }
