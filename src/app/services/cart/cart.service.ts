import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url: string = "http://localhost:8080/cart"

  constructor(private http: HttpClient) {}

  public getUserCart(id: number){

    return this.http.get(this.url + "/get/cart/for/" + id)
  }

  public addProductToCart(body: any){
    return this.http.put(this.url + "/add-to-cart", body).subscribe()
  }

  public removeProductFromCart(body: any){
    return this.http.put(this.url + "/remove-from-cart", body)
  }
}
