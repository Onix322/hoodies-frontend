import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input() email: String = "";
  @Input() password: String = "";

  constructor(private authService: AuthService){}

  public async login(){
    this.authService.login(this.email, this.password)
  }
}
