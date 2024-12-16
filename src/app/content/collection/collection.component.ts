import { Component } from '@angular/core';
import {SeeProductsButtonComponent} from '../../utils/buttons/see-products-button/see-products-button.component';
import {pendingUntilEvent} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-collection',
  imports: [
    SeeProductsButtonComponent
  ],
    templateUrl: './collection.component.html',
    standalone: true,
    styleUrl: './collection.component.css'
})
export class CollectionComponent {
  static title:string = ""

  public getOneWordFromTitle(index: number){
    const arrayWords: Array<String> = [];
    let word:string = "";

    for (let i = 0; i < CollectionComponent.title.length; i++) {
      if(CollectionComponent.title.charAt(i) != " "){
        word += CollectionComponent.title.charAt(i);
      } else {
        arrayWords.push(word)
        word = "";
      }
    }

    console.log(arrayWords, word, CollectionComponent.title)

    return arrayWords[index];
  }
}
