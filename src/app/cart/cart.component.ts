import {Component, OnInit} from '@angular/core';
import {NavComponent} from '../nav/nav.component';
import {AuthService} from '../services/auth/auth.service';
import {CartService} from '../services/cart/cart.service';
import {OrderService} from '../services/order/order.service';
import {FooterComponent} from '../utils/footer/footer.component';
import {Notification} from '../utils/notifications/notification/notification';
import {switchMap, tap} from 'rxjs';

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

  public products = new Array<any>();
  public lengthOfProducts: number | undefined;
  public totalPrice: Number = 0;
  private cart: any;

  constructor(private cartService: CartService, private authService: AuthService, private orderService: OrderService) {

  }

  ngOnInit() {
    this.updateProducts()
  }

  public removeFromCart(productId: number) {
    this.authService.getCurrentLoggedUser()
      .pipe(
        switchMap(user => this.cartService.removeFromCart({userId: user, productId: productId}))
      ).subscribe({
      next: () => {
        Notification.notifyValid("Product removed successfully")
        this.refresh()
      },
      error: () => {
        Notification.notifyInvalid("Product has not been removed.")
      }
    })
    this.updateProducts()
  }

  public updateProducts() {
    this.authService.getCurrentLoggedUser()
      .pipe(
        switchMap(userId => this.cartService.getUserCart(userId)),
        tap(value => console.log("Tap tap:", value))
      ).subscribe({
        next: (value: any) => {
          value.result.products.forEach((prod: any) => {
            this.products.push(prod)
            this.totalPrice += prod.price
          })
          this.cartService.setCartLength(value.result.products.length)
          this.cart = value.result
          this.lengthOfProducts = this.products.length
        },
        error: (err) => {
          console.log(err)
        }
    })
  }

  public deleteAllProductFromCart() {
    this.authService.getCurrentLoggedUser()
      .pipe(
        switchMap(userId => this.cartService.getUserCart(userId)),
        switchMap((cart: any)=> {
          cart.result.products = []
          return this.cartService.removeAllProducts(cart.result.user.id)
        }),
      ).subscribe({
        next: () => {
          this.refresh()
          this.cartService.setCartLength(0)
        }
    })
  }

  public refresh() {
    this.products.length = 0
    this.totalPrice = 0;
  }

  public placeOrder() {

    console.log(this.cart)
    const body = {
      status: "CONFIRMED",
      totalPrice: this.totalPrice,
      user: {
        id: this.cart.user.id
      },
      products: this.cart.products
    }

    this.orderService.createOrder(body).subscribe({
      next: () => {
        this.deleteAllProductFromCart()
        Notification.notifyValid("Order placed!")
      },
      error: (err) => {
        Notification.notifyInvalid("Order has not been placed!")
      }
    })
  }
}
