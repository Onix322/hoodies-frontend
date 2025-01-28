import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {PopupComponent} from '../popup.component';
import {FormValidator} from '../../form-validator/form-validator';
import {Notification} from '../../notifications/notification/notification';
import {ChangePasswordService} from '../../../services/user/change-password.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [
    PopupComponent,
    FormsModule
  ],
  standalone: true,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements AfterViewInit{

  @ViewChild(PopupComponent, {read: PopupComponent})
  private popup: PopupComponent | undefined;

  @Input() public userId: number = 0;
  @Input() public oldPassword: string = "";
  @Input() public newPassword: string = "";
  @Input() public confirmNewPassword: string = "";

  constructor(private validator: FormValidator, private changePassword: ChangePasswordService) {
  }

  ngAfterViewInit() {
    this.validator.validate("change-password")
  }

  public open() {
    this.popup?.open()
  }

  public save(){
    //logic
    if(this.userId < 1){
      Notification.notifyInvalid("User id must be greater than 0")
      return
    }

    const body = {
      userId: this.userId,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword,
    }

    this.changePassword.change(body).subscribe({
      next: () => {
        Notification.notifyValid("Password has been changed successfully")
        this.popup?.close()
      },
      error: (err) => {
        Notification.notifyValid("Something went wrong!")
        console.log(err)

      }
    })
  }
}
