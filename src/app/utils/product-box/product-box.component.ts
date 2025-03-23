import {Component, Input} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {NgIf} from '@angular/common';
import {Notification} from '../notifications/notification/notification';
import {ProductStarRatingComponent} from './product-star-rating/product-star-rating.component';
import {CartButtonComponent} from '../buttons/cart-button/cart-button.component';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [
    NgIf,
    ProductStarRatingComponent
  ],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent {
  @Input() id: String = "";
  @Input() title: String = "";
  @Input() size: String = "";
  @Input() price: String = "";
  @Input() rating: number = 0;
  @Input() numberReviews: number = 0;
  @Input() productImage: any | undefined;
  @Input() page: string = "";
  @Input() availableForPurchase: boolean = false;

  constructor(private cartService: CartService) {
  }

  public addToCart() {
    let idNumber = Number.parseInt(this.id.toString())
    this.cartService.addToCartImpl(idNumber).subscribe({
      next: () => {
        Notification.notifyValid("Product added to cart!")
      },
      error: () => {
        Notification.notifyInvalid("Product could not be added to cart!")
      }
    })
  }
}
