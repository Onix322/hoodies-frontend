import { Component } from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {BehaviorSubject, first} from 'rxjs';
import {NgOptimizedImage} from '@angular/common';
import {Notification} from '../../../utils/notifications/notification/notification';

@Component({
  selector: 'app-see-activated-users',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './see-activated-users.component.html',
  styleUrl: './see-activated-users.component.css'
})
export class SeeActivatedUsersComponent {

  protected users: BehaviorSubject<Array<any>> = new BehaviorSubject(new Array<any>())

  constructor(private userService: UserService) {
    setTimeout(() => this.usersInitializer(), 200)

  }

  private usersInitializer(){
    this.userService.getActivated()
      .pipe(
        first()
      )
      .subscribe({
        next: value => this.users.next(value.result),
        error: err => console.log(err)
      })
  }

  protected deactivateUser(id: number) {
    if (id < 1) {
      Notification.notifyInvalid("Id must be greater than 0")
      return
    }

    this.userService.deactivate(id).subscribe({
      next: () => {
        Notification.notifyValid("User has been deactivated!")
        this.usersInitializer()
      },
      error: () => {
        Notification.notifyInvalid("Something went wrong!")
      }
    })
  }
}
