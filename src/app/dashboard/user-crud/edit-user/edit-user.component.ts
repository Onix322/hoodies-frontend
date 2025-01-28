import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormValidator} from '../../../utils/form-validator/form-validator';
import {Notification} from '../../../utils/notifications/notification/notification';
import {UserService} from '../../../services/user/user.service';
import {PopupComponent} from '../../../utils/popup/popup.component';
import {ChangePasswordComponent} from '../../../utils/popup/change-password/change-password.component';

@Component({
  selector: 'app-edit-user',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PopupComponent,
    ChangePasswordComponent
  ],
  standalone: true,
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements AfterViewInit {

  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() email: string = "";
  @Input() phone: string = "";
  @Input() role: string = "";
  @Input() userImage: string = "";
  @Input() activationStatus: string = ""

  @ViewChild(ChangePasswordComponent, {read: ChangePasswordComponent})
  private popup: ChangePasswordComponent | undefined;

  constructor(private userService: UserService, private validator: FormValidator) {
  }

  ngAfterViewInit() {
    if (!this.validator.validate("edit-user")) return
  }

  public editUser() {

    if (this.id < 1) {
      Notification.notifyInvalid("Id must be greater than 0")
      return
    }

    if (!this.validator.validate("edit-user")) return

    const user = {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      role: this.role,
      userImage: this.userImage,
      activationStatus: this.activationStatus
    }

    this.userService.updateUser(user).subscribe({
      next: () => {
        Notification.notifyValid("User has been updated!")
      },
      error: () => {
        Notification.notifyInvalid("Something went wrong!")
      }
    })

    this.clear()
  }

  public getUser(id: number) {
    if (id < 0) return
    this.clear()
    this.userService.getUser(id).subscribe({
      next: (value: any) => {
        this.id = value.result.id,
          this.name = value.result.name,
          this.email = value.result.email,
          this.phone = value.result.phone,
          this.role = value.result.role,
          this.userImage = value.result.userImage,
          this.activationStatus = value.result.activationStatus
      },
      error: (err) => {
        console.log(err)
        Notification.notifyInvalid("Id must be greater than 0")
      }
    })
  }

  public deactivateUser(id: number) {
    if (id < 1) {
      Notification.notifyInvalid("Id must be greater than 0")
      return
    }

    this.userService.deactivate(this.id).subscribe({
      next: () => {
        Notification.notifyValid("User has been deactivated!")
      },
      error: () => {
        Notification.notifyInvalid("Something went wrong!")
      }
    })
    this.clear()
  }

  public activateUser(id: number) {
    if (id < 1) {
      Notification.notifyInvalid("Id must be greater than 0")
      return
    }

    this.userService.activate(this.id).subscribe({
      next: () => {
        Notification.notifyValid("User has been activated!")
      },
      error: () => {
        Notification.notifyInvalid("Something went wrong!")
      }
    })
    this.clear()
  }

  public clear() {
    this.id = 0;
    this.name = "";
    this.email = "";
    this.phone = "";
    this.role = "";
    this.userImage = "";
    this.activationStatus = "";
  }

  public changePasswordPopup() {

    if(this.id < 1){
      Notification.notifyInvalid("Add an id or Get user details first!")
      return
    }

    this.popup?.open()
  }
}
