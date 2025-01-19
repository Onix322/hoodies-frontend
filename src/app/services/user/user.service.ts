import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseWrapper} from '../../utils/response/response-wrapper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8080/users/"

  constructor(private http: HttpClient) {
  }

  public createUser(body: any) {
    return this.http.post(this.url + "post", body)
  }

  public updateUser(body: any) {
    this.http.put(this.url + "put", body)
  }

  public getUser(id: number) {
    return this.http.get<ResponseWrapper>(this.url + "get/" + id)
  }

  public loginUser(body: any) {
    return this.http.post<ResponseWrapper>(this.url + "login", body)
  }

  public delete(id: number) {
    this.http.get(this.url + "delete/" + id)
  }
}
