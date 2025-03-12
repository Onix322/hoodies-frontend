import {Component, OnInit} from '@angular/core';
import {NavComponent} from '../nav/nav.component';
import {ProductBoxComponent} from '../utils/product-box/product-box.component';
import {FooterComponent} from '../utils/footer/footer.component';
import {ProductService} from '../services/product/product.service';
import {BehaviorSubject, delay, first} from 'rxjs';
import {ProductStarRatingComponent} from '../utils/product-box/product-star-rating/product-star-rating.component';

@Component({
  selector: 'app-all-products-page',
  standalone: true,
  imports: [NavComponent, ProductBoxComponent, FooterComponent, ProductStarRatingComponent],
  templateUrl: './all-products-page.component.html',
  styleUrl: './all-products-page.component.css'
})
export class AllProductsPageComponent{
  protected products: BehaviorSubject<Array<any>> = new BehaviorSubject(new Array<any>())

  constructor(private productService: ProductService) {
    setTimeout(() => this.productInitializer(), 200)
  }

  public productInitializer(){
    this.productService.getAll()
      .subscribe({
        next: (value: any) => this.products.next(value.result),
        error: (err) => console.log(err)
      })
  }
}
