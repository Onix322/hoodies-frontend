import {Component, OnInit} from '@angular/core';
import {NavComponent} from '../nav/nav.component';
import {ProductBoxComponent} from '../utils/product-box/product-box.component';
import {FooterComponent} from '../utils/footer/footer.component';
import {ProductService} from '../services/product/product.service';
import {BehaviorSubject, first} from 'rxjs';
import {ProductStarRatingComponent} from '../utils/product-box/product-star-rating/product-star-rating.component';
import {FormsModule} from '@angular/forms';
import {SearchService} from '../services/product/search.service';

@Component({
  selector: 'app-all-products-page',
  standalone: true,
  imports: [NavComponent, ProductBoxComponent, FooterComponent, ProductStarRatingComponent, FormsModule],
  templateUrl: './all-products-page.component.html',
  styleUrl: './all-products-page.component.css'
})
export class AllProductsPageComponent implements OnInit {
  protected products: BehaviorSubject<Array<any>> = new BehaviorSubject(new Array<any>())
  protected orderBy: String = "MOST POPULAR";
  protected search: String = "";
  protected color: String[] = [];
  protected rating: Number[] = [];
  protected size: String[] = [];

  constructor(private productService: ProductService, private searchService: SearchService) {
    setTimeout(() => this.productInitializer(), 200)
  }

  ngOnInit(): void {
    this.inputEventListener()
    this.deactivateInputsOnPageChange()
  }

  public productInitializer() {
    this.productService.getAll()
      .subscribe({
        next: (value: any) => this.products.next(this.orderByFunc(value.result, this.orderBy)),
        error: (err) => console.log(err)
      })
  }

  public searchProducts() {
    const body: any = {
      id: null,
      title: this.stringToArray(this.search),
      numberReview: null,
      availableForPurchase: null,
      price: null,
      productColor: this.color.length < 1 ? null : this.color,
      description: null,
      rating: this.rating.length < 1 ? null : this.rating,
      size: this.size.length < 1 ? null : this.size
    }

    // console.log(body)
    if (body.productColor == null &&
      body.size == null &&
      body.title == null &&
      body.rating == null) {
      this.productInitializer()
      return;
    }

    this.searchService.search(body)
      .pipe(
        first(),
      )
      .subscribe({
        next: value => {
          this.products.next(this.orderByFunc(value.result, this.orderBy))
        },
        error: err => {
          console.log(err)
        }
      })
  }

  private orderByFunc(array: Array<any>, value: String): Array<any> {
    switch (value) {
      case "MOST POPULAR":
        return array.sort((a, b) => b.numberReviews - a.numberReviews)
      case "LOWEST PRICE":
        return array.sort((a, b) => a.price - b.price);
      case "HIGHEST PRICE":
        return array.sort((a, b) => b.price - a.price);
      default:
        return array;
    }
  }

  private stringToArray(string: String): String[] | null {
    if (string.trim().length < 1) {
      return null;
    }
    return string.split(" ");
  }

  private inputEventListener(): void {
    let inputs = document.getElementsByTagName("input")
    Array.from(inputs)
      .forEach(input => {
        input.addEventListener("click", () => {

          if (input.classList.contains("color-input")) {
            this.addToArrayString(this.color, input.value.toLocaleUpperCase())
          }

          if (input.classList.contains("size-input")) {
            this.addToArrayString(this.size, input.value.toLocaleUpperCase())
          }

          if (input.classList.contains("review-input")) {
            this.addToArrayNumber(this.rating, input.value)
          }
        })
      })
  }

  private deactivateInputs(): void {
    Array.from(document.getElementsByTagName("input")).forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  private deactivateInputsOnPageChange() {
    window.addEventListener("pageshow", this.deactivateInputs);
  }

  private addToArrayString(array: String[], value: String): void {
    let indexOfValue = array.findIndex(element => element == value);
    if (indexOfValue > -1) {
      array.splice(indexOfValue, 1)
    } else {
      array.push(value)
    }
  }

  private addToArrayNumber(array: Number[], value: String): void {
    let indexOfValue = array.findIndex(element => element == parseInt(value.toString()));
    if (indexOfValue > -1) {
      array.splice(indexOfValue, 1)
    } else {
      array.push(parseInt(value.toString()))
    }
  }

  protected reset() {
    this.productInitializer()
    this.rating = [];
    this.size = [];
    this.color = [];
    this.search = "";
    this.orderBy = "MOST POPULAR"

    this.deactivateInputs();
  }
}
