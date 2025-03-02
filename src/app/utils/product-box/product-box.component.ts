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
