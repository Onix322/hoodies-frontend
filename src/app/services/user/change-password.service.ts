import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  private url: string = "http://localhost:8080/change-password"

  constructor(private http: HttpClient) { }

  change(body : any) {
    return this.http.put(this.url, body)
  }
}
