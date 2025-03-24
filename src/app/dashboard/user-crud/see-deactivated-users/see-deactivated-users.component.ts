import { Component } from '@angular/core';
import {BehaviorSubject, first} from 'rxjs';
import {UserService} from '../../../services/user/user.service';
import {Notification} from '../../../utils/notifications/notification/notification';

@Component({
  selector: 'app-see-deactivated-users',
  imports: [],
  templateUrl: './see-deactivated-users.component.html',
  styleUrl: './see-deactivated-users.component.css'
})
export class SeeDeactivatedUsersComponent {
  protected users: BehaviorSubject<Array<any>> = new BehaviorSubject(new Array<any>())

  constructor(private userService: UserService) {
    setTimeout(() => this.usersInitializer(), 200)

  }

  private usersInitializer(){
    this.userService.getDeactivated()
      .pipe(
        first()
      )
      .subscribe({
        next: value => this.users.next(value.result),
        error: err => console.log(err)
      })
  }

  protected activateUser(id: number) {
    if (id < 1) {
      Notification.notifyInvalid("Id must be greater than 0")
      return
    }

    this.userService.activate(id).subscribe({
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
