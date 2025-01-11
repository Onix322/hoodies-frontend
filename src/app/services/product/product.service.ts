import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
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

  public async get(id: Number): Promise<ResponseWrapper>{
    return await firstValueFrom(this.http.get<ResponseWrapper>(this.url + "get/" + id))
  }

  public edit(body: any) {
    this.http.put(this.url + "put", body).subscribe()
    console.log(body)
  }

}

