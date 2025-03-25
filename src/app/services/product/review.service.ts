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

  public update(body: any){
    return this.http.put<ResponseWrapper>(this.url + "put", body)
  }

  public getReviewsFor(productId: number){
    return this.http.get<ResponseWrapper>(this.url + "get/" + productId);
  }

  public getUserReviews(userId: number){
    return this.http.get<ResponseWrapper>(this.url + "get/user/" + userId);
  }

  public getReview(reviewId: number){
    return this.http.get<ResponseWrapper>(this.url + "get/review/" + reviewId);
  }
}
