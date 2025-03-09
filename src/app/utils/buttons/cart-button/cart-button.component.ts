import {Component, Output} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';
import {BehaviorSubject} from 'rxjs';

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
      .subscribe({
        next: (value) => {
          this.cartLength.next(value)
        }
      })
  }
}
