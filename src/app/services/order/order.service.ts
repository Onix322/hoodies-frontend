import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = "http://localhost:8080/order/"

  constructor(private http: HttpClient) {
  }

  public createOrder(body: any) {
    return this.http.post(this.url + "post", body)

  }
}
