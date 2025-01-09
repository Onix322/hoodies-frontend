import {booleanAttribute, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private url: string = "http://localhost:8080/products/"

  constructor(private http: HttpClient) { }

  public post(body: any){
    this.http.post(this.url, body).subscribe(body)
  }

  public delete(id: Number){
    this.http.delete(this.url + id).subscribe()
  }
}
