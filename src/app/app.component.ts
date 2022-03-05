import { Component, Sanitizer } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'puxzl';

  constructor(public util: UtilService, private titleService: Title) {
    this.titleService.setTitle(this.title);
    //util.splitMasterList();
    //util.findWordsWithoutDoubleLettersInFile('assets/words/four.json');
  }
}
