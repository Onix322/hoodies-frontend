import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {Redirect} from '../../redirect/redirect';

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

  constructor(private userService: UserService, private redirect: Redirect) {

  }

  ngOnInit(): void {

    let userId = sessionStorage.getItem("userId")

    if (userId == null) return

    this.userService.getUser(Number.parseInt(userId)).subscribe({
      next: value => {
        this.username = value.result.name
        this.userId = value.result.id;
      }
    })

  }
}
