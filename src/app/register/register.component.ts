import {AfterViewInit, Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserService} from '../services/user/user.service';
import {Redirect} from '../utils/redirect/redirect';
import {FormValidator} from '../utils/form-validator/form-validator';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterViewInit{

  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() email: string = "";
  @Input() phone: string = "";
  @Input() password: string = "";
  @Input() confirmPassword: string = "";
  @Input() role: string = "";
  @Input() userImage: string = "";

  constructor(private userService: UserService, private redirect: Redirect, private validator: FormValidator) {
    this.redirect.toIfAuth("/")
  }

  ngAfterViewInit() {
    this.validator.validate("register-user")
  }

  public createUser() {

    if(!this.validator.validate("register-user")) return

    const user = {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: "CUSTOMER",
      userImage: this.userImage
    }

    if(user.userImage == "") {
      user.userImage = "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
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
