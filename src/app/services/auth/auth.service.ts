import {Injectable} from '@angular/core';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: any;
  private isAuth: boolean = false;

  constructor(private userService: UserService) { }

  get user(): any {
    return this._user;
  }

  set user(value: any) {
    this._user = value;
  }

  public login(email: String, password: String){

    let loginBody: any = {
      email: email,
      password: password
    }

    this.userService.loginUser(loginBody).subscribe({
      next: (value) =>{
        this.user = value.result

        console.log(this.user != null)
        this.isAuth = this.user != null
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
