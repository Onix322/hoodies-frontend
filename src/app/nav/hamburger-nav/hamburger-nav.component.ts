import {AfterViewInit, Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {CartButtonComponent} from '../../utils/buttons/cart-button/cart-button.component';
import {ProfileButtonComponent} from '../../utils/buttons/profile-button/profile-button.component';

@Component({
  selector: 'app-hamburger-nav',
  imports: [
    NgIf,
    CartButtonComponent,
    ProfileButtonComponent
  ],
  templateUrl: './hamburger-nav.component.html',
  standalone: true,
  styleUrl: './hamburger-nav.component.css'
})
export class HamburgerNavComponent implements AfterViewInit {
  protected innerWidth = window.innerWidth;

  ngAfterViewInit(): void {
    window.addEventListener("resize", () => {
      this.innerWidth = window.innerWidth
      console.log(this.innerWidth)
    })
  }


}
