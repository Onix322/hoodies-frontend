import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {Redirect} from '../../redirect/redirect';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-profile-button',
  imports: [],
  templateUrl: './profile-button.component.html',
  standalone: true,
  styleUrl: './profile-button.component.css'
})
export class ProfileButtonComponent implements OnInit {
  username: string = "Guest";
  userId: number = 0;

  constructor(private userService: UserService, private auth: AuthService) {

  }

  ngOnInit(): void {

    this.userService.getUser(this.auth.getCurrentLoggedUser()).subscribe({
      next: value => {
        this.username = value.result.name
        this.userId = value.result.id;
      }
    })

  }
}
