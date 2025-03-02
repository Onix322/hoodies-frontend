import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {AuthService} from '../../../services/auth/auth.service';
import {skipLast, switchMap, takeLast} from 'rxjs';

@Component({
  selector: 'app-profile-button',
  imports: [],
  templateUrl: './profile-button.component.html',
  standalone: true,
  styleUrl: './profile-button.component.css'
})
export class ProfileButtonComponent implements OnInit {
  @Input() username: string = "Guest";
  @Input() userId = 0;

  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getDetails();
  }

  public toProfilePage() {
    window.location.replace("/profile/" + this.userId)
  }

  public getDetails() {
    this.authService.getCurrentLoggedUser().pipe(
      skipLast(1),
      switchMap(user => this.userService.getUser(user)),
    ).subscribe({
      next: (value) => {
        this.username = value.result.name
        this.userId = value.result.id
      },
      error: (err) => {
        this.username = "Guest";
        this.userId = 0;
        console.log(err)
      }
    })
  }
}
