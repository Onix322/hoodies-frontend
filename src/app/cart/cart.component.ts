import {Component, OnInit} from '@angular/core';
import {NavComponent} from '../nav/nav.component';
import {AuthService} from '../services/auth/auth.service';
import {CartService} from '../services/cart/cart.service';
import {OrderService} from '../services/order/order.service';
import {FooterComponent} from '../utils/footer/footer.component';
import {Notification} from '../utils/notifications/notification/notification';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [
    NavComponent,
    FooterComponent
  ],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  public products = new BehaviorSubject(new Array<any>());
  public totalPrice: number = 0;
  private userId = new BehaviorSubject(0)

  constructor(private cartService: CartService, private authService: AuthService, private orderService: OrderService) {

  }

  ngOnInit() {
    this.userIdInitializer()
    this.displayProducts()
  }

  public removeFromCart(productId: number) {
    this.cartService.removeFromCartImpl(productId)
      .subscribe({
        next: (length: any) => {
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

  public deleteAllProductFromCart() {

  }

  public placeOrder() {

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
