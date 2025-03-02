import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {ResponseWrapper} from '../../utils/response/response-wrapper';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private url: String = "http://localhost:8080/address"

  constructor(private http: HttpClient) {}

  public getAllFor(userId: number){
    return this.http.get<ResponseWrapper>(this.url + `/get/${userId}`)
  }
}
