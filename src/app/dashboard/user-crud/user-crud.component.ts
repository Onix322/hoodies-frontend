import {AfterViewInit, Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserService} from '../../services/user/user.service';
import {FormValidator} from '../../utils/form-validator/form-validator';

@Component({
  selector: 'app-user-crud',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements AfterViewInit{

  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() email: string = "";
  @Input() phone: string = "";
  @Input() password: string = "";
  @Input() confirmPassword: string = "";
  @Input() role: string = "";
  @Input() userImage: string = "";

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
      userImage: this.userImage
    }

    if(user.userImage == "") {
      user.userImage = "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
    }

    if (this.id < 1 || this.id == null) {
      //id is set null in backend
      //if id == null return object created in db
      this.userService.createUser(user).subscribe()
    } else {
      this.userService.updateUser(user)
    }

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
          this.password = value.result.password,
          this.confirmPassword = value.result.confirmPassword,
          this.role = value.result.role
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }

  public deleteUser(id: number) {
    if (id < 1) return

    this.userService.delete(this.id)
    this.clear()
  }

  public clear() {
    this.id = 0;
    this.name = "";
    this.email = "";
    this.phone = "";
    this.password = "";
    this.confirmPassword = "";
    this.role = "";
  }
}
