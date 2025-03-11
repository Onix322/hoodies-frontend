import {Component, Input, Output, ViewChild} from '@angular/core';
import {NavComponent} from '../nav/nav.component';
import {FooterComponent} from '../utils/footer/footer.component';
import {TransferFromCartService} from '../services/order/transfer-from-cart.service';
import {CartService} from '../services/cart/cart.service';
import {AuthService} from '../services/auth/auth.service';
import {Notification} from '../utils/notifications/notification/notification';
import {AddressService} from '../services/user/address.service';
import {BehaviorSubject, skipLast, switchMap} from 'rxjs';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';
import {PopupComponent} from '../utils/popup/popup.component';
import {FormsModule} from '@angular/forms';
import {OrderService} from '../services/order/order.service';

@Component({
  selector: 'app-finalize-order-page',
  imports: [
    NavComponent,
    FooterComponent,
    PopupComponent,
    FormsModule
  ],
  templateUrl: './finalize-order-page.component.html',
  styleUrl: './finalize-order-page.component.css'
})
export class FinalizeOrderPageComponent {

  @ViewChild('addressPopup', {read: PopupComponent})
  protected addressPopup: PopupComponent | undefined;

  private cartId: BehaviorSubject<number> = new BehaviorSubject(0);
  protected totalPrice: number = 0.0;
  private userId: BehaviorSubject<number> = new BehaviorSubject(0);
  protected products: Array<any> = new Array<any>();
  protected addressId: number = 0;
  protected comments: string = "No comments";
  private createdAt: string = formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en')
  protected chosenAddress: BehaviorSubject<any> = new BehaviorSubject(null);
  protected addresses: Array<any> = new Array<any>()

  constructor(private transfer: TransferFromCartService, private cartService: CartService, private authService: AuthService, private address: AddressService, private router: Router, private addressService: AddressService, private orderService: OrderService) {

    if(transfer.productsIds.length < 1){
      this.router.navigateByUrl('/cart', {skipLocationChange: false, replaceUrl: false})
      return
    }

    this.userIdInitializer();
    this.cartIdInitializer();
    this.addressesInitializer();
    this.productsInitializer(this.transfer.productsIds);
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

  private totalPriceInitializer(products: Array<any>) {
    this.totalPrice = 0.0
    for (let i = 0; i < products.length; i++) {
      this.totalPrice += products[i].product.price * products[i].quantity
    }
  }

  private addressesInitializer() {
    this.authService.getCurrentLoggedUser()
      .pipe(
        switchMap((userId) => this.address.getAllFor(userId))
      )
      .subscribe({
        next: (value) => {
          this.addresses = value.result
        },
        error: err => {
          console.log(err)
        }
      })
  }

  private userIdInitializer() {
    this.authService.getCurrentLoggedUser()
      .subscribe({
        next: (value) => {
          this.userId.next(value)
        },
        error: err => {
          console.log(err)
        }
      })
  }

  private cartIdInitializer(){
    this.userId.asObservable()
      .pipe(
        skipLast(1),
        switchMap((userId) => this.cartService.getUserCart(userId))
      )
      .subscribe({
        next: (cart: any) => {
          this.cartId.next(cart.result.id);
        }
      })
  }

  public orderCreator() {

    if(this.addressId < 1) {
      Notification.notifyInvalid("Choose an address first!")
      return
    }

    const body = {
      cart: {
        id: this.cartId.getValue(),
        totalPrice: this.totalPrice,
        user: {
          id: this.userId.getValue(),
        },
        products: this.products,
      },
      address: {
        id: this.addressId,
      },
      comments: this.comments,
      createdAt: this.createdAt
    }

    this.orderService.createOrder(body).subscribe({
      next: (value: any) => {
        Notification.notifyValid("Order sent!")
        console.log(value)
        this.router.navigateByUrl("/cart", {skipLocationChange: false})
      },
      error: (err) => {
        Notification.notifyInvalid("Order not sent! Error occurred!");
        console.log(err)
      }
    })

    this.cartService.removeAllProducts(
      {
        cartId: this.cartId.getValue(),
        cartItemsIds: this.transfer.productsIds
      }).subscribe()

  }

  private chosenAddressInitializer(addressId: number){
    this.addressService.getAddress(addressId)
      .subscribe({
        next: value => {
          this.chosenAddress.next(value.result)
          this.addressPopup?.close()
        }
      })
  }

  protected chooseAddress(addressId: number){
    this.addressId = addressId;
    this.chosenAddressInitializer(addressId)
  }

  protected openAddressPopup(){
    this.addressPopup?.open()
  }
}
