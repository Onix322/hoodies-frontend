import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  private url: string = "https://hoodies-frontend.vercel.app/change-password"

  constructor(private http: HttpClient) { }

  change(body : any) {
    return this.http.put(this.url, body)
  }
}
