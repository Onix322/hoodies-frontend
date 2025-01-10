import {booleanAttribute, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private url: string = "http://localhost:8080/products/"
  constructor(private http: HttpClient) { }

  public post(body: any){

    this.http.post(this.url + "post", body).subscribe()
  }

  public delete(id: Number){
    this.http.delete(this.url + "delete/" + id).subscribe()
  }

  public get(id: Number){
    this.http.get(this.url + "get/" + id).subscribe()
  }

  public edit(body: any){
    this.http.put(this.url + "put", body).subscribe(body)
  }
}
