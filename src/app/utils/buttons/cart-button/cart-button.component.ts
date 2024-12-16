import {Component} from '@angular/core';

@Component({
  selector: 'app-cart-button',
  imports: [],
  templateUrl: './cart-button.component.html',
  standalone: true,
  styleUrl: './cart-button.component.css'
})
export class CartButtonComponent {
  cartLength: number = 0;
}
