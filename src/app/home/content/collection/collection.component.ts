import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SeeProductsButtonComponent} from '../../../utils/buttons/see-products-button/see-products-button.component';
import {ProductBoxComponent} from '../../../utils/product-box/product-box.component';
import {ProductService} from '../../../services/product/product.service';

@Component({
  selector: 'app-collection',
  imports: [
    SeeProductsButtonComponent,
    ProductBoxComponent,
  ],
  templateUrl: './collection.component.html',
  standalone: true,
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements AfterViewInit, OnInit {

  @Input() title: string = "";
  @Input() textStyle: string = "";
  @Input() containerStyle: string = "";
  @Input() articlesStyle: string = "";
  @Input() amount: number = 4;
  @Input() startFrom: number = 1;

  words: Array<String> = [];
  protected products: Array<any> = new Array<any>();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    if(!(this.amount && this.startFrom)) return
    this.getAmount(this.amount, this.startFrom)

  }

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

  public async getAmount(amount: number, startFrom: number) {
    this.productService.getAmount(amount, startFrom).subscribe({
      next: (value: any) => this.products = value.result,
      error: (err) => console.log(err)
    })
  }
}
