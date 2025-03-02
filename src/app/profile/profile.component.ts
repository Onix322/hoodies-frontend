import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {UserService} from '../services/user/user.service';
import {NavComponent} from '../nav/nav.component';
import {ChangePasswordComponent} from '../utils/popup/change-password/change-password.component';
import {PopupComponent} from '../utils/popup/popup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Notification} from '../utils/notifications/notification/notification';
import {FormValidator} from '../utils/form-validator/form-validator';
import {NgIf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {filter, skipLast, switchMap, windowWhen} from 'rxjs';
import {AddressService} from '../services/user/address.service';

@Component({
  selector: 'app-profile',
  imports: [
    NavComponent,
    ChangePasswordComponent,
    PopupComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, AfterViewInit {

  @ViewChild("changePasswordC", {read: ChangePasswordComponent})
  private changePasswordPopup: ChangePasswordComponent | undefined;

  @ViewChild("changeInfos", {read: PopupComponent})
  private changeInfosPopup: PopupComponent | undefined;

  @ViewChild("deleteConfirmation", {read: PopupComponent})
  private deleteConfirmation: PopupComponent | undefined;

  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() email: string = "";
  @Input() phone: string = "";
  @Input() role: string = "";
  @Input() userImage: string = "";
  @Input() activationStatus: string = "";
  @Input() addresses: Array<any> = [];

  constructor(private addressService: AddressService, private authService: AuthService, private userService: UserService, private validator: FormValidator) {
  }

  ngOnInit(): void {
   this.userInitializer()
    this.addressesInitializer()
  }

  ngAfterViewInit() {
    if (!this.validator.validate("edit-user")) return
  }

  public logOut() {
    this.authService.logout()
    window.location.reload()
  }

  public openChangePassword() {
    this.changePasswordPopup?.open()
  }

  public openChangeInfos() {
    this.changeInfosPopup?.open()
  }

  public openDeleteConfirmation() {
    this.deleteConfirmation?.open()
  }

  public closeDeleteConfirmation() {
    this.deleteConfirmation?.close()
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
        this.changeInfosPopup?.close()
      },
      error: () => {
        Notification.notifyInvalid("Something went wrong!")
      }
    })
  }

  public deleteAccount() {
    this.userService.deactivate(this.id).subscribe({
      next: () => {
        Notification.notifyValid("User has been deactivated!")
        this.logOut()
      },
      error: () => {
        Notification.notifyInvalid("Something went wrong!")
      }
    })
  }

  public toDashboard() {
    window.location.replace("/dashboard")
  }

  public userInitializer(){
    this.authService.isAuth()
      .pipe(
        filter(status => status),
        switchMap(() => this.authService.getCurrentLoggedUser()),
        switchMap(userId => this.userService.getUser(userId))
      ).subscribe({
      next: value => {
        this.id = value.result.id
        this.name = value.result.name
        this.email = value.result.email
        this.phone = value.result.phone
        this.role = value.result.role
        this.userImage = value.result.userImage
        this.activationStatus = value.result.activationStatus
      }
    })
  }

  public addressesInitializer(){
    this.authService.getCurrentLoggedUser()
      .pipe(
        skipLast(1),
        switchMap((userId) => this.addressService.getAllFor(userId))
      ).subscribe({
      next: value => {
        console.log(value.result)
        this.addresses = value.result
      }
    })
  }
}
