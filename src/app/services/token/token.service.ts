import { Injectable } from '@angular/core';
import {firstValueFrom, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ResponseWrapper} from '../../utils/response/response-wrapper';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly URL = "http://localhost:8080/token/"

  constructor(private http: HttpClient) { }

  public getToken(){
    return localStorage.getItem("token")
  }

  public setToken(token: string){
    localStorage.setItem("token", token)
  }

  public validate(token: string): Observable<ResponseWrapper>{
    return this.http.post<ResponseWrapper>(this.URL + "valid", token)
  }

  public getUserIdFromToken(token: string): Observable<ResponseWrapper>{
    return this.http.post<ResponseWrapper>(this.URL + "get-user-id", token)
  }

  public removeToken(){
    let token = localStorage.getItem("token")

    if(token){
      localStorage.removeItem(token)
    }
  }
}
