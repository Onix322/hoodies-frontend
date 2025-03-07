import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, first, mergeMap, skipLast, switchMap, take, tap} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {ResponseWrapper} from '../../utils/response/response-wrapper';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url: string = "http://localhost:8080/cart"

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  public getUserCart(id: number) {
    return this.http.get(this.url + "/get/" + id)
  }

  public getCartLength() {
    let cartLengthBS: BehaviorSubject<number> = new BehaviorSubject(0);

    this.authService.getCurrentLoggedUser().pipe(
      skipLast(1),
      switchMap((userId) => this.http.get(this.url + `/get-length/by-userid/${userId}`)),
    ).subscribe({
      next: (value: any) => {
        cartLengthBS.next(value.result)
      }
    })

    return cartLengthBS.asObservable()
  }

  private addToCart(body: any) {
    return this.http.put(this.url + "/add-to-cart", body)
  }

  private removeFromCart(body: any) {
    return this.http.delete(this.url + `/delete/item/${body.cartId}/${body.productId}`)
  }

  public removeAllProducts(body: {cartId: number, cartItemsIds: number[]}) {
    return this.http.put(this.url + "/delete/items", body)
  }

  public getItem(cartItemId: number){
    return this.http.get<ResponseWrapper>(this.url + `/get-item/${cartItemId}`)
  }

  public addToCartImpl(productId: number) {
    return this.authService.isAuth().pipe(
      take(1),
      mergeMap((status) => {
        if (!status) {
          this.router.navigateByUrl("/login", {skipLocationChange: true, replaceUrl: false})
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
      tap(() => this.getCartLength())
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
