import {AfterViewInit, Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {Redirect} from '../utils/redirect/redirect';
import {FormValidator} from '../utils/form-validator/form-validator';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit{
  @Input() email: String = "";
  @Input() password: String = "";

  constructor(private authService: AuthService, private redirect: Redirect, private validator: FormValidator) {
    this.redirect.toIfAuth("/")
  }

  ngAfterViewInit() {
    this.validator.validate("login-user")
  }

  public login() {
    if(!this.validator.validate("login-user")) return
    this.authService.login(this.email, this.password)
  }
}
