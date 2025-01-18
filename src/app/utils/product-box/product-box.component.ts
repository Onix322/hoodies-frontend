import {Component, Input} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [],
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

  constructor(private cartService: CartService, private authService: AuthService) {
  }

  public addToCart(){
    let userId = this.authService.getCurrentLoggedUser()

    this.cartService.addProductToCart({userId: userId, productId: this.id})
  }
}
