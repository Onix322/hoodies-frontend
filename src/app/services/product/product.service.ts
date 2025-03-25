import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseWrapper} from '../../utils/response/response-wrapper';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private url: string = "https://hoodies-frontend.vercel.app/products/"

  constructor(private http: HttpClient) {
  }

  public post(body: any) {
    return this.http.post(this.url + "post", body)
  }

  public delete(id: number) {
    return this.http.delete(this.url + "delete/" + id)
  }

  public get(id: number): Observable<ResponseWrapper> {
    return this.http.get<ResponseWrapper>(this.url + "get/" + id)
  }

  public getAmount(amount: number, startFrom: number): Observable<ResponseWrapper> {

    return this.http.get<ResponseWrapper>(this.url + `get/amount/${amount}/${startFrom}`)
  }

  public getAll() {
    return this.http.get(this.url + "get")
  }

  public edit(body: any) {
    return this.http.put(this.url + "put", body)
  }

}

