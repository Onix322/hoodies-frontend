import {Component, Input} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {AuthService} from '../../services/auth/auth.service';
import {NgIf} from '@angular/common';
import {
  BehaviorSubject,
  catchError,
  every,
  filter, firstValueFrom,
  iif,
  map,
  Observable,
  of, subscribeOn,
  switchMap,
  takeUntil,
  takeWhile,
  tap
} from 'rxjs';
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

  public addToCart(){
    this.authService.isAuth().pipe(
      tap(status => {
        if(!status){
          Notification.notifyInvalid("You must login first!")
          this.router.navigateByUrl("/login", {skipLocationChange: true, replaceUrl: false})
        }
      }),
      switchMap(() => this.authService.getCurrentLoggedUser()),
      switchMap((userId) => this.cartService.addToCart({userId: userId, productId: this.id}))
    ).subscribe()
  }
}
