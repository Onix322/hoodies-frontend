import {Component, Input} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {AuthService} from '../../../services/auth/auth.service';
import {BehaviorSubject, firstValueFrom, mergeMap, skip, skipLast, switchMap, take, takeLast} from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile-button',
  imports: [
    RouterLink
  ],
  templateUrl: './profile-button.component.html',
  standalone: true,
  styleUrl: './profile-button.component.css'
})
export class ProfileButtonComponent {
  @Input() protected username: BehaviorSubject<string> = new BehaviorSubject("Guest");

  constructor(private userService: UserService, private authService: AuthService) {
    this.usernameInitializer()
  }

  public usernameInitializer() {
    this.authService.getCurrentLoggedUser().pipe(
      skip(1),
      switchMap((userId) => this.userService.getUser(userId))
    ).subscribe({
      next: (value) => {
        this.username.next(value.result.name)
      },
      error: (err) => {
        this.username.next("Guest");
        console.log(err)
      }
    })
  }
}
