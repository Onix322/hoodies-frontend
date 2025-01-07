import {AfterViewInit, Component} from '@angular/core';
import {LogoComponent} from '../utils/logo/logo.component';
import {NavButtonsComponent} from './nav-buttons/nav-buttons.component';
import {HamburgerButtonComponent} from './nav-buttons/hamburger-button/hamburger-button.component';
import {HamburgerNavComponent} from './hamburger-nav/hamburger-nav.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    LogoComponent,
    NavButtonsComponent,
    HamburgerButtonComponent,
    HamburgerNavComponent,
    NgIf
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements AfterViewInit {

  public windowSize: number = 801;

  ngAfterViewInit() {

    this.windowSize = window.innerWidth
    this.refreshOnResize(() => {
      this.windowSize = window.innerWidth
    })
  }

  private refreshOnResize(param: Function) {
    window.addEventListener("resize", () => param())
  }
}
