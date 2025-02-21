import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, delay, first, mergeMap, switchMap, take, tap, throwError} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Notification} from '../../utils/notifications/notification/notification';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartLengthBS: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private url: string = "http://localhost:8080/cart"

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  public getUserCart(id: number) {
    return this.http.get(this.url + "/get/cart/for/" + id)
  }

  public getCartLength() {
    return this.cartLengthBS.asObservable()
  }

  public setCartLength(number: number) {
    this.cartLengthBS.next(number)
  }

  private addToCart(body: any) {
    return this.http.put(this.url + "/add-to-cart", body)
  }

  public removeFromCart(body: any) {
    return this.http.put(this.url + "/remove-from-cart", body)
  }

  public removeAllProducts(userId: number) {
    return this.http.delete(this.url + "/remove-all/" + userId)
  }

  public addToCartImpl(productId: number) {
    this.authService.isAuth().pipe(
      mergeMap((isAuth) => {
        if (!isAuth) {
          Notification.notifyInvalid("You must login first!");
          this.router.navigateByUrl("/login", { skipLocationChange: true, replaceUrl: false });
          return throwError(() => new Error("User not logged in"));
        }
        return this.authService.getCurrentLoggedUser();
      }),
      switchMap((userId) => this.addToCart({ userId, productId })),
      tap((cart: any) => this.setCartLength(cart.result.products.length))
    ).subscribe({
      next: () => {
        Notification.notifyValid("Product added to cart!");
      },
      error: (err) => {
        console.error("Error:", err.message);
      }
    });
  }
}
