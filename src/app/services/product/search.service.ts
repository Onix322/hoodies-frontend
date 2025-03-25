import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseWrapper} from '../../utils/response/response-wrapper';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = "https://hoodies-frontend.vercel.app/search"

  constructor(private http: HttpClient) { }

  public search(body: any){
    return this.http.put<ResponseWrapper>(this.url, body)
  }
}
