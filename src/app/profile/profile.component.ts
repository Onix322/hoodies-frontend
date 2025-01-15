import { Component } from '@angular/core';
import {Redirect} from '../utils/redirect/redirect';

@Component({
  selector: 'app-profile',
  imports: [],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private redirect: Redirect) {
    this.redirect.toIfNotAuth("/login")
  }
}
