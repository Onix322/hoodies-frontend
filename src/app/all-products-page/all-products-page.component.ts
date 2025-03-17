import {Component} from '@angular/core';
import {NavComponent} from '../nav/nav.component';
import {ProductBoxComponent} from '../utils/product-box/product-box.component';
import {FooterComponent} from '../utils/footer/footer.component';
import {ProductService} from '../services/product/product.service';
import {BehaviorSubject, first} from 'rxjs';
import {ProductStarRatingComponent} from '../utils/product-box/product-star-rating/product-star-rating.component';
import {FormsModule} from '@angular/forms';
import {Notification} from '../utils/notifications/notification/notification';
import {SearchService} from '../services/product/search.service';

@Component({
  selector: 'app-all-products-page',
  standalone: true,
  imports: [NavComponent, ProductBoxComponent, FooterComponent, ProductStarRatingComponent, FormsModule],
  templateUrl: './all-products-page.component.html',
  styleUrl: './all-products-page.component.css'
})
export class AllProductsPageComponent {
  protected products: BehaviorSubject<Array<any>> = new BehaviorSubject(new Array<any>())
  protected search: string = "";
  protected color: string = "";
  protected numberReviews: number = 0;
  protected size: string = "";

  constructor(private productService: ProductService, private searchService: SearchService) {
    setTimeout(() => this.productInitializer(), 200)
  }

  public productInitializer() {
    this.productService.getAll()
      .subscribe({
        next: (value: any) => this.products.next(value.result),
        error: (err) => console.log(err)
      })
  }

  public searchProducts() {
    if (this.search.trim().length < 1) {
      Notification.notifyInvalid("You must enter a value")
      this.productInitializer()
      return;
    }


    let elements= document.getElementsByClassName("color-input");

    for (let element of elements) {
      console.log((<HTMLInputElement> element).checked)
    }



    // this.searchService.search(this.search)
    //   .pipe(
    //     first(),
    //   )
    //   .subscribe({
    //     next: value => this.products.next(value.result),
    //     error: err => console.log(err)
    //   })
  }
}
