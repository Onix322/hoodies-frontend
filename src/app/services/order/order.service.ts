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

  public getAllOrders(){
    return this.http.get(this.url + 'get')
  }

  public deleteOrder(userId: number, orderId: number){
    return this.http.delete(this.url + `delete/${userId}/${orderId}`)
  }
}
