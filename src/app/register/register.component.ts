import {AfterViewInit, Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserService} from '../services/user/user.service';
import {FormValidator} from '../utils/form-validator/form-validator';
import {AuthService} from '../services/auth/auth.service';
import {Notification} from '../utils/notifications/notification/notification';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterViewInit {

  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() email: string = "";
  @Input() phone: string = "";
  @Input() password: string = "";
  @Input() confirmPassword: string = "";
  @Input() role: string = "";
  @Input() userImage: string = "";

  constructor(private userService: UserService, private validator: FormValidator, private authService: AuthService, private router: Router) {
    this.authService.isAuth().subscribe({
      next: (value) => {
        if(value){
          window.location.replace("/")
        }
      }
    })
  }

  ngAfterViewInit() {
    this.validator.validate("register-user")
  }

  public createUser() {

    if (!this.validator.validate("register-user")) return

    const user = {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: "CUSTOMER",
      userImage: this.userImage,
      activationStatus: "ACTIVATED",
    }

    if (user.userImage == "") {
      user.userImage = "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
    }

    this.userService.createUser(user).subscribe({
      next: (value: any) => {
        Notification.notifyInvalid("Welcome!")
        this.router.navigateByUrl("/login", {skipLocationChange: false, replaceUrl: true})
      },
      error: (err) => {
        Notification.notifyInvalid(err.error.message)
      }
    })
  }
}
