import {Injectable} from '@angular/core';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  constructor(private userService: UserService, private router: Router) {
  }

  public login(email: String, password: String) {

    let loginBody: any = {
      email: email,
      password: password
    }

    this.userService.loginUser(loginBody).pipe().subscribe({
      next: (value) => {

        sessionStorage.setItem("userId", value.result.id)

        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/']);
        });
      },
    })
  }

  public isAuth(): boolean{
    return !!sessionStorage.getItem("userId")
  }

  public getUserFromSession(): number{

    let user = sessionStorage.getItem("userId");

    if(!user) return 0;
    return Number.parseInt(user)
  }
}
