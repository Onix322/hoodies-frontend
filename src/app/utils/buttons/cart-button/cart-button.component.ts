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
    setTimeout(async () => await this.cartLengthInitializer(), 100)
  }

  public async cartLengthInitializer() {
    await this.cartService.getCartLength()
      .forEach(value => this.cartLength.next(value))
  }
}
