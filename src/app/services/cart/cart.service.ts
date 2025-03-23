import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, first, map, mergeMap, switchMap, take, tap, throwError} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {ResponseWrapper} from '../../utils/response/response-wrapper';
import {Notification} from '../../utils/notifications/notification/notification';
import {CartButtonComponent} from '../../utils/buttons/cart-button/cart-button.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url: string = "http://localhost:8080/cart"
  public cartLengthBS: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  public getUserCart(id: number) {
    return this.http.get(this.url + "/get/" + id)
  }

  public getCartLength() {
    this.authService.getCurrentLoggedUser().pipe(
      first(value => value > 0),
      switchMap((userId) => this.http.get(this.url + `/get-length/by-userid/${userId}`))
    ).subscribe({
      next: (value: any) => {
        this.cartLengthBS.next(value.result)
      }
    })

    return this.cartLengthBS.asObservable()
  }

  private addToCart(body: any) {
    return this.http.put(this.url + "/add-to-cart", body)
  }

  private removeFromCart(body: any) {
    return this.http.delete(this.url + `/delete/item/${body.cartId}/${body.productId}`)
  }

  public removeAllProducts(body: { cartId: number, cartItemsIds: number[] }) {
    return this.http.put(this.url + "/delete/items", body)
  }

  public getItem(cartItemId: number) {
    return this.http.get<ResponseWrapper>(this.url + `/get-item/${cartItemId}`)
  }

  public addToCartImpl(productId: number) {
    return this.authService.isAuth().pipe(
      take(1),
      mergeMap((status) => {
        if (!status) {
          this.router.navigateByUrl("/login", {skipLocationChange: true, replaceUrl: false})
          throw new Error("Login please!")
        }
        return this.authService.getCurrentLoggedUser()
      }),
      first(),
      mergeMap((userId) => this.getUserCart(userId)),
      mergeMap((cartId: any) => this.addToCart(
        {
          id: null,
          quantity: 1,
          cart: {id: cartId.result.id},
          product: {id: productId}
        }
      )),
      map(() => this.getCartLength())
    )
  }

  public removeFromCartImpl(productId: number) {
    return this.authService.getCurrentLoggedUser()
      .pipe(
        switchMap((userId) => this.getUserCart(userId)),
        take(1),
        mergeMap((cart: any) => this.removeFromCart({cartId: cart.result.id, productId: productId})),
        tap(() => this.getCartLength()),
      )
  }
}
