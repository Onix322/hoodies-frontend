import { Component } from '@angular/core';

@Component({
    selector: 'app-profile-button',
    imports: [],
    templateUrl: './profile-button.component.html',
    standalone: true,
    styleUrl: './profile-button.component.css'
})
export class ProfileButtonComponent {
  loginStatus: boolean = false;
  userName: String = "Guest";
}
