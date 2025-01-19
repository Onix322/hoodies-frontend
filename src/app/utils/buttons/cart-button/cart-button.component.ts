import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-cart-button',
  imports: [],
  templateUrl: './cart-button.component.html',
  standalone: true,
  styleUrl: './cart-button.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class CartButtonComponent implements AfterViewInit {

  cartLength: number = 0;

  constructor(private cartService: CartService, private authService: AuthService) {
    this.cartService.getUserCart(this.authService.getCurrentLoggedUser()).subscribe({
      next: (value: any) => {
        this.cartService.setCartLength(value.result.products.length)
      }
    })
  }

  ngAfterViewInit(): void {
    this.cartService.getCartLength().subscribe({
      next: (value: number) => {
        this.cartLength = value
      }
    });
    console.log((this.cartLength))
  }
}
