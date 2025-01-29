import {Injectable} from '@angular/core';
import {UserService} from '../user/user.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Notification} from '../../utils/notifications/notification/notification';

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
      error: () => {
        Notification.notifyInvalid("This account does not exist!")
      }
    })
  }

  public isAuth(): Observable<boolean> {
    this.isAuthenticated.next(!!sessionStorage.getItem("userId"))
    return this.isAuthenticated.asObservable();
  }

  public getCurrentLoggedUser(): number {

    let user = sessionStorage.getItem("userId");

    if (!user) return 0;
    return Number.parseInt(user)
  }

  public logout() {
    sessionStorage.removeItem("userId")
  }
}
