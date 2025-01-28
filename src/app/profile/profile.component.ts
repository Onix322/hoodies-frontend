import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {Redirect} from '../utils/redirect/redirect';
import {AuthService} from '../services/auth/auth.service';
import {UserService} from '../services/user/user.service';
import {NavComponent} from '../nav/nav.component';
import {ChangePasswordComponent} from '../utils/popup/change-password/change-password.component';

@Component({
  selector: 'app-profile',
  imports: [
    NavComponent,
    ChangePasswordComponent
  ],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  @ViewChild(ChangePasswordComponent, {read: ChangePasswordComponent})
  private popup: ChangePasswordComponent | undefined;

  @Output() id: number = 0;
  @Output() name: string = "";
  @Output() email: string = "";
  @Output() phone: string = "";
  @Output() role: string = "";
  @Output() userImage: string = "";

  constructor(private authService: AuthService, private userService: UserService, private redirect: Redirect) {
    this.redirect.toIfNotAuth("/login")
  }

  ngOnInit(): void {

    this.userService.getUser(
      this.authService.getCurrentLoggedUser()
    ).subscribe({
      next: value => {
        this.id = value.result.id
        this.name = value.result.name
        this.email = value.result.email
        this.phone = value.result.phone
        this.role = value.result.role
        this.userImage = value.result.userImage
      },
      error: err => {
        console.log(err)
      }
    })
  }

  public logOut() {
    this.authService.logout()
    window.location.replace("/")
  }

  public changePassword(){
    this.popup?.open()
  }
}
