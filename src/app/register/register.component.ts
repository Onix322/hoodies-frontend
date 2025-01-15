import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserService} from '../services/user/user.service';
import {Redirect} from '../utils/redirect/redirect';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() email: string = "";
  @Input() phone: string = "";
  @Input() password: string = "";
  @Input() confirmPassword: string = "";
  @Input() role: string = "";

  constructor(private userService: UserService, private redirect: Redirect) {
      this.redirect.toIfAuth("/")
  }

  public createUser() {
    const user = {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: "CUSTOMER"
    }

    this.userService.createUser(user).subscribe({
      next: (value: any) => {
        console.log(value)
        this.redirect.to("/login")
      },
      error:(err) => {
        console.log(err)
      }
    })
  }
}
