import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  three = "" as SafeResourceUrl;
  four = "" as SafeResourceUrl;
  five = "" as SafeResourceUrl;
  six = "" as SafeResourceUrl;
  seven = "" as SafeResourceUrl;
  eight = "" as SafeResourceUrl;
  nine = "" as SafeResourceUrl;
  ten = "" as SafeResourceUrl;
  eleven = "" as SafeResourceUrl;
  twelve = "" as SafeResourceUrl;

  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer) {

  }

  findWordsWithoutDoubleLettersInFile(file: string) {
    this.getFileContents(file).subscribe((f: Array<string>) => {
      let isograms: Array<string> = [];
      f.forEach(word => {
        if (this.isIsogram(word))
          isograms.push(word);
      });
      console.log(isograms);
    })

  }

  splitMasterList() {
    this.getFileContents('assets/words/wordlist', true).subscribe((file: string) => {
      let words = file.split('\n');

      let threes: string[] = [];
      let fours: string[] = [];
      let fives: string[] = [];
      let sixes: string[] = [];
      let sevens: string[] = [];
      let eights: string[] = [];
      let nines: string[] = [];
      let tens: string[] = [];
      let elevens: string[] = [];
      let twelves: string[] = [];

      words.forEach(word => {
        word = word.trim();
        switch (word.length) {
          case 3:
            threes.push(word);
            break;
          case 4:
            fours.push(word);
            break;
          case 5:
            fives.push(word);
            break;
          case 6:
            sixes.push(word);
            break;
          case 7:
            sevens.push(word);
            break;
          case 8:
            eights.push(word);
            break;
          case 9:
            nines.push(word);
            break;
          case 10:
            tens.push(word);
            break;
          case 11:
            elevens.push(word);
            break;
          case 12:
            twelves.push(word);
            break;
          default:
            break;
        }
      });

      // let data = JSON.stringify(threes);
      // const threesblob = new Blob([data], { type: 'application/json' });
      // this.three = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(threesblob))

      // let data4 = JSON.stringify(fours);
      // const foursblob = new Blob([data4], { type: 'application/json' });
      // this.four = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(foursblob))

      // let data5 = JSON.stringify(fives);
      // const fivesblob = new Blob([data5], { type: 'application/json' });
      // this.five = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(fivesblob))

      // let data6 = JSON.stringify(sixes);
      // const sixesblob = new Blob([data6], { type: 'application/json' });
      // this.six = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(sixesblob))

      // let data7 = JSON.stringify(sevens);
      // const sevensblob = new Blob([data7], { type: 'application/json' });
      // this.seven = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(sevensblob))

      // let data8 = JSON.stringify(eights);
      // const eightsblob = new Blob([data8], { type: 'application/json' });
      // this.eight = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(eightsblob))

      // let data9 = JSON.stringify(nines);
      // const ninesblob = new Blob([data9], { type: 'application/json' });
      // this.nine = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(ninesblob))

      // let data10 = JSON.stringify(tens);
      // const tensblob = new Blob([data10], { type: 'application/json' });
      // this.ten = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(tensblob))

      // let data11 = JSON.stringify(elevens);
      // const elevensblob = new Blob([data11], { type: 'application/json' });
      // this.eleven = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(elevensblob))

      // let data12 = JSON.stringify(twelves);
      // const twelvesblob = new Blob([data12], { type: 'application/json' });
      // this.twelve = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(twelvesblob))
      console.log(threes.length);
      console.log(fours.length);
      console.log(fives.length);
      console.log(sixes.length);
      console.log(sevens.length);
      console.log(eights.length);
      console.log(nines.length);
      console.log(tens.length);
      console.log(elevens.length);
      console.log(twelves.length);
    });
  }

  getFileContents(file: string, asText: boolean = false): Observable<any> {
    if (asText) {
      return this.http.get(file, { responseType: 'text' });
    } else {
      return this.http.get(file);
    }
  }

  isIsogram(string: string): boolean {
    return !/(.).*\1/.test(string);
  }

}
