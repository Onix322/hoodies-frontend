import {Component} from '@angular/core';
import {NavComponent} from '../nav/nav.component';
import {FooterComponent} from '../utils/footer/footer.component';
import {TransferFromCartService} from '../services/order/transfer-from-cart.service';
import {CartService} from '../services/cart/cart.service';
import {AuthService} from '../services/auth/auth.service';
import {Notification} from '../utils/notifications/notification/notification';

@Component({
  selector: 'app-finalize-order-page',
  imports: [
    NavComponent,
    FooterComponent
  ],
  templateUrl: './finalize-order-page.component.html',
  styleUrl: './finalize-order-page.component.css'
})
export class FinalizeOrderPageComponent {

  protected totalPrice: number = 0;
  protected products: Array<any> = new Array<any>();

  constructor(private transfer: TransferFromCartService, private cartService: CartService, private authService: AuthService) {
    this.productsInitializer(this.transfer.productsIds)

  }

  private productsInitializer(productsIds: Array<any>) {
    productsIds.forEach(id => {
      this.cartService.getItem(id).subscribe({
        next: (value) => {
          this.products.push(value.result)
          this.totalPriceInitializer(this.products)
        },
        error: (err) => {
          Notification.notifyInvalid("Cart item not found!")
          console.log(err)
        }
      })
    })
  }

  private totalPriceInitializer(products: Array<any>){
    for (let i = 0; i < products.length; i++){
      this.totalPrice += products[i].product.price
    }
  }
}
