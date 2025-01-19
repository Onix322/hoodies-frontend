import {Injectable} from '@angular/core';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {Redirect} from '../../utils/redirect/redirect';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private userService: UserService) {

  }

  public login(email: String, password: String) {

    let loginBody: any = {
      email: email,
      password: password
    }

    this.userService.loginUser(loginBody).pipe().subscribe({
      next: (value) => {

        sessionStorage.setItem("userId", value.result.id)

        window.location.reload()
      },
    })
  }

  public isAuth(): Observable<boolean>{
    this.isAuthenticated.next(!!sessionStorage.getItem("userId"))
    return this.isAuthenticated.asObservable();
  }

  public getCurrentLoggedUser(): number{

    let user = sessionStorage.getItem("userId");

    if(!user) return 0;
    return Number.parseInt(user)
  }

  public logout(){
    sessionStorage.removeItem("userId")
  }
}
