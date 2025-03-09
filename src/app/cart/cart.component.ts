import {Component, OnInit} from '@angular/core';
import {NavComponent} from '../nav/nav.component';
import {AuthService} from '../services/auth/auth.service';
import {CartService} from '../services/cart/cart.service';
import {OrderService} from '../services/order/order.service';
import {FooterComponent} from '../utils/footer/footer.component';
import {Notification} from '../utils/notifications/notification/notification';
import {BehaviorSubject} from 'rxjs';
import {TransferFromCartService} from '../services/order/transfer-from-cart.service';
import {Router} from '@angular/router';
import {ProductStarRatingComponent} from "../utils/product-box/product-star-rating/product-star-rating.component";

@Component({
  selector: 'app-cart',
    imports: [
        NavComponent,
        FooterComponent,
        ProductStarRatingComponent
    ],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  public products = new BehaviorSubject(new Array<any>());
  public totalPrice: number = 0;
  private userId = new BehaviorSubject(0)

  constructor(private cartService: CartService, private authService: AuthService, private transfer: TransferFromCartService, private router: Router) {
    setTimeout(() => this.userIdInitializer(), 100)
    setTimeout(() => this.displayProducts(), 100)
  }

  public removeFromCart(productId: number) {
    this.cartService.removeFromCartImpl(productId)
      .subscribe({
        next: () => {
          this.displayProducts()
          Notification.notifyValid("Product removed successfully")
        },
        error: (err) => {
          this.displayProducts()
          Notification.notifyInvalid("Product has not been removed.")
          console.log(err)
        }
      })

  }

  public displayProducts() {
    setTimeout(() => {
      this.cartService.getUserCart(this.userId.getValue())
        .subscribe({
          next: (value: any) => {
            this.products.next(value.result.products)
            this.totalPrice = value.result.totalPrice
          },
          error: (err) => {
            console.log(err)
          }
        })
    }, 200)
  }

  public finalizeOrder() {

    if(this.products.getValue().length < 1){
      Notification.notifyInvalid("You must have at least 1 product in cart!")
      return
    }

    let productsIds = new Array<any>()
    this.products.getValue().forEach(product => {
      //cartItem entity id
      productsIds.push(product.id)
    })
    this.transfer.productsIds = productsIds;

    this.router.navigateByUrl('/finalize-order', {skipLocationChange: false, replaceUrl: true})
  }

  private userIdInitializer(): void {
    this.authService.getCurrentLoggedUser()
      .subscribe({
        next: (id) => {
          this.userId.next(id)
        },
      })
  }
}
