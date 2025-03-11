import {Component, Output} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';
import {BehaviorSubject, first} from 'rxjs';

@Component({
  selector: 'app-cart-button',
  imports: [],
  templateUrl: './cart-button.component.html',
  standalone: true,
  styleUrl: './cart-button.component.css'
})
export class CartButtonComponent {

  @Output()
  protected cartLength: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private cartService: CartService) {
    setTimeout(() => this.cartLengthInitializer(), 100)
  }

  public cartLengthInitializer() {
    this.cartService.getCartLength()
      .pipe(
        first(value => value > 0)
      )
      .subscribe({
        next: value => this.cartLength.next(value),
        error: err => console.log(err)
      })
  }
}
