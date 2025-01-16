import {Component, OnInit, Output} from '@angular/core';
import {Redirect} from '../utils/redirect/redirect';
import {AuthService} from '../services/auth/auth.service';
import {UserService} from '../services/user/user.service';
import {NavComponent} from '../nav/nav.component';

@Component({
  selector: 'app-profile',
  imports: [
    NavComponent
  ],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  @Output() name: string = "";
  @Output() email: string = "";
  @Output() phone: string = "";
  @Output() role: string = "";

  constructor(private authService: AuthService, private userService: UserService, private redirect: Redirect) {
    this.redirect.toIfNotAuth("/login")
  }

  ngOnInit(): void {

    this.userService.getUser(
      this.authService.getCurrentLoggedUser()
    ).subscribe({
      next: value => {
        this.name = value.result.name
        this.email = value.result.email
        this.phone = value.result.phone
        this.role = value.result.role
      },
      error: err => {
        console.log(err)
      }
    })
  }

  public logOut() {
    this.authService.logout()
    this.redirect.to("/")
  }
}
