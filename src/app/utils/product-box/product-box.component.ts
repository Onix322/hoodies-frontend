import {Component, Input} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {AuthService} from '../../services/auth/auth.service';
import {NgIf} from '@angular/common';
import {BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError} from 'rxjs';
import {Notification} from '../notifications/notification/notification';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent {
  @Input() id: String = "";
  @Input() title: String = "";
  @Input() size: String = "";
  @Input() price: String = "";
  @Input() rating: String = "";
  @Input() productImage: any | undefined;
  @Input() page: string = "";

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {
  }
  public addToCart() {

    let userId = new BehaviorSubject(0)

    this.authService.isAuth().pipe(
      tap(value => {
        if (!value) {
          Notification.notifyInvalid("You must login first!")
          this.router.navigateByUrl("/login", {skipLocationChange: true, replaceUrl: false})
          throwError(() => "Not login")
        }
      }),
      switchMap(() => this.authService.getCurrentLoggedUser()),
      tap(id => userId.next(id)),
      switchMap(() => this.cartService.addToCart({userId: userId.getValue(), productId: this.id})),
      tap((value: any) => this.cartService.setCartLength(value.result.products.length)),
    ).subscribe({
      next: (cart) => {
        Notification.notifyValid("Product added to cart!")
        this.cartService.setCartLength(cart.result.products.length)
      },
      error: (err) =>{
        console.log("Not logged in")
        console.log(err)
      }
    })
  }
}
