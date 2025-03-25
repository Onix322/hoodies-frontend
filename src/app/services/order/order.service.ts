import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseWrapper} from '../../utils/response/response-wrapper';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = "https://hoodies-frontend.vercel.app/order/"

  constructor(private http: HttpClient) {
  }

  public createOrder(body: any) {
    return this.http.post(this.url + "post", body)
  }

  public getAllOrders(){
    return this.http.get(this.url + 'get')
  }

  public changeStatus(body: any){
    return this.http.put(this.url + 'status', body)
  }

  public getForUser(userId: number){
    return this.http.get<ResponseWrapper>(this.url + `get/${userId}`)
  }
}
