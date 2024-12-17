import {AfterViewInit, Component, Input} from '@angular/core';
import {SeeProductsButtonComponent} from '../../utils/buttons/see-products-button/see-products-button.component';

@Component({
  selector: 'app-collection',
  imports: [
    SeeProductsButtonComponent,
  ],
  templateUrl: './collection.component.html',
  standalone: true,
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements AfterViewInit {

  @Input() title: string = "";
  @Input() textStyle: string = "";
  @Input() containerStyle: string = "";
  @Input() imageBg: string = "";
  @Input() imageBgStyle: string = "";
  @Input() articlesStyle: string = "";
  words: Array<String> = [];


  ngAfterViewInit(): void {
    this.words = this.transformStringToArrayOfWords();
  }

  public transformStringToArrayOfWords() {

    // (& -> is a character for adding a space on the same line

    const arrayWords: Array<String> = [];
    let word: String = "";

    for (let i = 0, j = 0; i < this.title.length; i++) {

      if (this.title.charAt(i) === " " || i === this.title.length - 1) {
        arrayWords[j] = word;
        j++;
        word = "";
        arrayWords.push(word);
        continue
      }

      word += this.title.charAt(i);
    }

    return arrayWords.map(w => w.replaceAll("(&", " "));
  }
}
