import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {PopupComponent} from '../popup.component';
import {FormValidator} from '../../form-validator/form-validator';
import {Notification} from '../../notifications/notification/notification';

@Component({
  selector: 'app-change-password',
  imports: [
    PopupComponent
  ],
  standalone: true,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements AfterViewInit{

  @ViewChild(PopupComponent, {read: PopupComponent})
  private popup: PopupComponent | undefined;

  @Input() public userId: number = 0;

  ngAfterViewInit() {
    this.validator.validate("change-password")
  }

  constructor(private validator: FormValidator) {
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

    console.log(this.userId)
  }
}
