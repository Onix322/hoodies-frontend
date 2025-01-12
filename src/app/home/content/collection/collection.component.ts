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
  words: Array<String> = [];
  protected products: Array<any> = new Array<any>();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProducts().then(e =>{
      console.log("Products found!")
    })
      .catch(err =>{
        console.log(err.error.message)
      })
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

  public async getAllProducts() {
    this.productService.getAll().subscribe({
      next: (value: any) => {
        if(this.products.length >= 4) return
        this.products = Array.from(value.result)
        console.log(this.products)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
