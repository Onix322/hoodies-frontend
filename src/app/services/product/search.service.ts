import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseWrapper} from '../../utils/response/response-wrapper';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = "http://localhost:8080/search?title="

  constructor(private http: HttpClient) { }

  public search(title: string){
    return this.http.get<ResponseWrapper>(this.url + title)
  }
}
