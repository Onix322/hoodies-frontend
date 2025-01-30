import {Component, Input} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {AuthService} from '../../services/auth/auth.service';
import {NgIf} from '@angular/common';

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

  constructor(private cartService: CartService, private authService: AuthService) {
  }

  public addToCart(){
    let userId = this.authService.getCurrentLoggedUser()

    this.cartService.verifyExistenceOfProduct(userId, Number.parseInt(this.id.toString())).subscribe({
      next: (value: any) => {
        if(value.result) return
        this.cartService.addToCart({userId: userId, productId: this.id})
      }
    })
  }
}
