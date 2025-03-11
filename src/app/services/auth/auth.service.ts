import {Injectable} from '@angular/core';
import {UserService} from '../user/user.service';
import {
  BehaviorSubject,
  catchError,
  filter,
  first,
  map,
  mergeMap,
  Observable,
  of,
  switchMap, take,
  takeLast,
  tap
} from 'rxjs';
import {Notification} from '../../utils/notifications/notification/notification';
import {TokenService} from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticate = new BehaviorSubject(false)
  private userId: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private userService: UserService, private token: TokenService) {

  }

  public authorize(email: string, password: string) {

    let token = this.token.getToken()

    if (!token) {
      console.log("token ", token)
      this.login({email: email, password: password})
      return
    }

    console.log("token ", token)

    this.token.validate(token).pipe(
      filter((status) => status.result),
      switchMap(() => this.token.getUserIdFromToken(token)),
      tap(user => console.log(user))
    ).subscribe({
      next: value => {
        this.userId.next(value.result)
        window.location.reload()
      },
      error: (err) => {
        console.log(err)
        if (err.error.status == 401) {
          this.login({email: email, password: password})
        }
      }
    })
  }

  public login({email = "", password = ""}) {

    let loginBody: any = {
      email: email,
      password: password
    }

    this.userService.loginUser(loginBody).pipe().subscribe({
      next: (value) => {
        this.token.setToken(value.result)
        this.authorize(loginBody.email, loginBody.password)
      },
      error: () => {
        Notification.notifyInvalid("This account does not exist!")
      }
    })
  }

  public isAuth(): Observable<boolean> {
    const token = this.token.getToken();

    if (!token) {
      return of(false);
    }

    return this.token.validate(token).pipe(
      first(),
      mergeMap(status => {
        this.isAuthenticate.next(status.result)
        return this.isAuthenticate.asObservable()
      }),
      catchError(err => {
        this.isAuthenticate.next(false);
        this.token.removeToken()
        return of(false);
      })
    );
  }

  public getCurrentLoggedUser() {
    let token = this.token.getToken()

    if (!token) {
      this.userId.next(0)
      return this.userId.asObservable()
    }

    this.token.getUserIdFromToken(token)
      .subscribe({
        next: (value) => this.userId.next(value.result),
        error: () => this.token.removeToken()
     })

    return this.userId.asObservable();
  }

  public logout() {
    localStorage.removeItem("token")
  }
}
