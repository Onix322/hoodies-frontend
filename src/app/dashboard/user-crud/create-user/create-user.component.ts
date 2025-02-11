import {AfterViewInit, Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../../services/user/user.service';
import {FormValidator} from '../../../utils/form-validator/form-validator';
import {RenderView} from '../../../utils/render-view/render-view';
import {Notification} from '../../../utils/notifications/notification/notification';


@Component({
  selector: 'app-create-user',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements AfterViewInit{

  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() email: string = "";
  @Input() phone: string = "";
  @Input() password: string = "";
  @Input() confirmPassword: string = "";
  @Input() role: string = "";
  @Input() userImage: string = "";
  @Input() activationStatus: string = ""

  constructor(private userService: UserService, private validator: FormValidator) {
  }

  ngAfterViewInit() {
    this.validator.validate("register-user")
  }

  public createUpdateUser() {

    if(!this.validator.validate("register-user")) return

    const user = {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: this.role,
      userImage: this.userImage,
      activationStatus: this.activationStatus
    }

    if(user.userImage == "") {
      user.userImage = "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
    }
    if(user.userImage == "") {
      user.activationStatus = "ACTIVATED"
    }

    if (this.id < 1 || this.id == null) {
      //id is set null in backend
      //if id == null return object created in db
      this.createFunc(user)
    } else {
      this.updateFunc(user)
    }

    this.clear()
  }

  private createFunc(body: any){
    this.userService.createUser(body)
      .subscribe({
        next: () => {
          Notification.notifyValid("User has been created!")
        },
        error: () => {
          Notification.notifyInvalid("User has not been created!")
        }
      })
  }

  private updateFunc(body: any){
    this.userService.updateUser(body)
      .subscribe({
        next: () => {
          Notification.notifyValid("User has been updated!")
        },
        error: () => {
          Notification.notifyInvalid("User has not been updated!")
        }
      })
  }

  private clear() {
    this.id = 0;
    this.name = "";
    this.email = "";
    this.phone = "";
    this.password = "";
    this.confirmPassword = "";
    this.role = "";
    this.userImage = "";
    this.activationStatus = "";
  }
}
