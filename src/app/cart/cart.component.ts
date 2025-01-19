import {Component, OnInit} from '@angular/core';
import {NavComponent} from '../nav/nav.component';
import {AuthService} from '../services/auth/auth.service';
import {CartService} from '../services/cart/cart.service';
import {Redirect} from '../utils/redirect/redirect';
import {OrderService} from '../services/order/order.service';

@Component({
  selector: 'app-cart',
  imports: [
    NavComponent
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

  constructor(private cartService: CartService, private authService: AuthService, private redirect: Redirect, private orderService: OrderService) {
    this.redirect.toIfNotAuth("/login")
  }

  ngOnInit() {
    this.updateProducts()
  }

  public removeFromCart(productId: number) {
    let userId = this.authService.getCurrentLoggedUser()
    this.cartService.removeFromCart({userId: userId, productId: productId})
      .subscribe(() => {
        this.refresh()
      })
  }

  public updateProducts() {
    this.cartService.getUserCart(this.authService.getCurrentLoggedUser())
      .subscribe({
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
        }
      )
  }

  public deleteAllProductFromCart() {
    this.cartService.getUserCart(this.authService.getCurrentLoggedUser()).subscribe({
      next: (value: any) => {
        value.result.products = []
        this.cartService.removeAllProducts(value.result.user.id).subscribe({
          next: () => {
            this.refresh()
            this.cartService.setCartLength(value.result.products.length)
          }
        })
      }
    })
  }

  public refresh() {
    this.products.length = 0
    this.totalPrice = 0;
    this.updateProducts();
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
        alert("Order placed successfully!")
      },
      error: (err) => {
        alert(err.error.message)
      }
    })
  }
}
