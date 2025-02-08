import {AfterViewInit, Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {FormValidator} from '../utils/form-validator/form-validator';
import {authGuard} from '../guard/auth-guard.guard';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {
  @Input() email: string = "";
  @Input() password: string = "";

  constructor(private authService: AuthService, private validator: FormValidator) {
    this.authService.isAuth().subscribe({
      next: (value) => {
        if(value){
          window.location.replace("/")
        }
      }
    })
  }

  ngAfterViewInit() {
    this.validator.validate("login-user")
  }

  public login() {
    if (!this.validator.validate("login-user")) return
    this.authService.authorize(this.email, this.password)

  }
}
