import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordullRoutingModule } from './wordull-routing.module';
import { DefaultComponent } from './pages/default/default.component';
import { LetterboxComponent } from './components/letterbox/letterbox.component';
import { WordrowComponent } from './components/wordrow/wordrow.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';


@NgModule({
  declarations: [
    DefaultComponent,
    LetterboxComponent,
    WordrowComponent,
    KeyboardComponent
  ],
  imports: [
    CommonModule,
    WordullRoutingModule
  ]
})
export class WordullModule { }
