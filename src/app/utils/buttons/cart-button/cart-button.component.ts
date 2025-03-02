import {ChangeDetectionStrategy, Component, Output} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';

@Component({
  selector: 'app-cart-button',
  imports: [],
  templateUrl: './cart-button.component.html',
  standalone: true,
  styleUrl: './cart-button.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class CartButtonComponent {

  @Output()
  protected cartLength: number = 0;

  constructor(private cartService: CartService) {
    this.cartService.getCartLength().subscribe({
      next: (value) => {
        this.cartLength = value
      }
    })
  }

}
