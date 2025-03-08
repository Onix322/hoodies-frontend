import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseWrapper} from '../../utils/response/response-wrapper';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private url: string = "http://localhost:8080/review/"

  constructor(private http: HttpClient) { }

  public create(body: any){
    return this.http.post<ResponseWrapper>(this.url + "post", body)
  }

  public getReviewsFor(productId: number){
    return this.http.get<ResponseWrapper>(this.url + "get/" + productId);
  }
}
