import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {NavComponent} from '../nav/nav.component';
import {AuthService} from '../services/auth/auth.service';
import {CartService} from '../services/cart/cart.service';
import {Redirect} from '../utils/redirect/redirect';
import {ProductBoxComponent} from '../utils/product-box/product-box.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    NavComponent
  ],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  public products = new Array<any>();
  public lengthOfProducts: number | undefined;
  public totalPrice: Number = 0;

  constructor(private cartService: CartService, private authService: AuthService, private redirect: Redirect) {
    if (!this.authService.isAuth()) {
      this.redirect.to("/login")
    }
  }

  ngOnInit() {
    this.updateProducts()
  }

  public removeFromCart(productId: number) {

    let userId = this.authService.getCurrentLoggedUser()
    this.cartService.removeProductFromCart({userId: userId, productId: productId})
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
            console.log(this.products)
            this.lengthOfProducts = this.products.length
          },
          error: (err) => {
            console.log(err)
          }
        }
      )
  }

  public refresh(){
    this.products.length = 0
    this.totalPrice = 0;
    this.updateProducts();
  }
}
