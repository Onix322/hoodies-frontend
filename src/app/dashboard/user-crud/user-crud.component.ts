import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-user-crud',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent {

  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() email: string = "";
  @Input() phone: string = "";
  @Input() password: string = "";
  @Input() confirmPassword: string = "";
  @Input() role: string = "";

  constructor(private userService: UserService) {
  }

  public createUpdateUser() {
    const user = {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: this.role
    }

    if (this.id < 1 || this.id == null) {
      //id is set null in backend
      //if id == null return object created in db
      this.userService.createUser(user)
    } else {
      this.userService.updateUser(user)
    }

    this.clear()
  }

  public getUser() {
    if (this.id < 0) return
    this.clear()
    this.userService.getUser(this.id).subscribe({
      next: (value: any) => {
        console.log(value)
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }

  public deleteUser() {
    if (this.id < 1) return

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
