import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-product-star-rating',
  imports: [
    NgForOf
  ],
  templateUrl: './product-star-rating.component.html',
  styleUrl: './product-star-rating.component.css'
})
export class ProductStarRatingComponent {

  @Input() rating: number = 0;
  @Input() numberReviews: number = 0;

  constructor() {
    console.log(this.rating)
  }

  public counterFull(){
    if(this.rating < 1){
      return [];
    }

    let array = new Array(1)

    for (let number = 1 ; number < this.rating; number++){

      array.push(number)
    }
    return array
  }
  public counterEmpty(){
    return new Array(5 - this.rating)
  }
}
