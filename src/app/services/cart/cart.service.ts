import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '../auth/auth.service';

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

  public setCartLength(number: number) {
    this.cartLengthBS.next(number)
  }

  public addToCart(body: any) {
    return this.http.put(this.url + "/add-to-cart", body).subscribe(() => {
      this.getUserCart(this.authService.getCurrentLoggedUser()).subscribe({
        next: (value: any) => {
          this.setCartLength(value.result.products.length)
        }
      })
    })
  }

  public removeFromCart(body: any) {
    return this.http.put(this.url + "/remove-from-cart", body)
  }

  public removeAllProducts(userId: number) {
    return this.http.delete(this.url + "/remove-all/" + userId)
  }
}
