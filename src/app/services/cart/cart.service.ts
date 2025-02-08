import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, map, Observable, switchMap, tap} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Notification} from '../../utils/notifications/notification/notification';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartLengthBS: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private url: string = "http://localhost:8080/cart"

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getUserCart(id: number) {
    return this.http.get(this.url + "/get/cart/for/" + id)
  }

  public getCartLength() {
    return this.cartLengthBS.asObservable()
  }

  public verifyExistenceOfProduct(userId: number, productId: number){
    const body = {
      userId: userId,
      productId: productId
    }

    return this.http.put(this.url + '/exist', body)
  }

  public setCartLength(number: number) {
    this.cartLengthBS.next(number)
  }

  public addToCart(body: any) {
    return this.http.put(this.url + "/add-to-cart", body)
  }

  public removeFromCart(body: any) {
    return this.http.put(this.url + "/remove-from-cart", body)
  }

  public removeAllProducts(userId: number) {
    return this.http.delete(this.url + "/remove-all/" + userId)
  }
}
