import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseWrapper} from '../../utils/response/response-wrapper';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private url: String = "https://hoodies-frontend.vercel.app/address"

  constructor(private http: HttpClient) {
  }

  public create(body: any) {
    return this.http.post(this.url + "/post", body)
  }

  public update(body: any) {
    return this.http.put(this.url + "/put", body)
  }

  public getAllFor(userId: number) {
    return this.http.get<ResponseWrapper>(this.url + `/get/${userId}`)
  }

  public getAddress(addressId: number) {
    return this.http.get<ResponseWrapper>(this.url + `/get-address/${addressId}`)
  }

  public deleteAddress(addressId: number){
    return this.http.delete(this.url + `/delete/${addressId}`)
  }
}
