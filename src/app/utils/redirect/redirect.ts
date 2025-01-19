import {Injectable} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class Redirect {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }

  public to(url: string){
    this.router.navigateByUrl(url, {skipLocationChange: false, replaceUrl: true}).then(r => {
      return r
    })
  }

  public toIfAuth(url: string){
    this.authService.isAuth().subscribe({
      next: (value) => {
        if(value) this.to(url)
      }
    })
  }

  public toIfNotAuth(url: string){
    this.authService.isAuth().subscribe({
      next: (value) => {
        if(!value) this.to(url)
      }
    })
  }

  public roleTo(url: string, role: string){



    this.userService.getUser(this.authService.getCurrentLoggedUser()).subscribe({
      next: value => {
        if(value.result.role == role){
          this.to(url)
        }
      },
      error: err => console.log(err)
    })

  }
}
