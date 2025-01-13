import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseWrapper} from '../../utils/response/response-wrapper';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private url: string = "http://localhost:8080/products/"

  constructor(private http: HttpClient) {
  }

  public post(body: any) {
    this.http.post(this.url + "post", body).subscribe()
  }

  public delete(id: Number) {
    this.http.delete(this.url + "delete/" + id).subscribe()
  }

  public get(id: Number): Observable<ResponseWrapper> {
    return this.http.get<ResponseWrapper>(this.url + "get/" + id)
  }

  public getAmount(amount: number, startFrom: number): Observable<ResponseWrapper> {

    return this.http.get<ResponseWrapper>(this.url + `get/amount/${amount}/${startFrom}`)
  }

  public getAll() {
    return this.http.get(this.url + "get")
  }

  public edit(body: any) {
    this.http.put(this.url + "put", body).subscribe()
    console.log(body)
  }

}

