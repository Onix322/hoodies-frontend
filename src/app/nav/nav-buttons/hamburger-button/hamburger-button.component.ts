import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-hamburger-button',
  imports: [],
  templateUrl: './hamburger-button.component.html',
  standalone: true,
  styleUrl: './hamburger-button.component.css'
})
export class HamburgerButtonComponent {

  public showMenu(): void{

    const hamburgerMenu = document.getElementById("hamburger-menu")

    if(!hamburgerMenu) return


    hamburgerMenu.style.zIndex = window.getComputedStyle(hamburgerMenu).zIndex == "-1" || "" ? "99" : "-1";
    hamburgerMenu.style.opacity = window.getComputedStyle(hamburgerMenu).opacity == "0" || "" ? "1" : "0";
    setTimeout(() =>{
      hamburgerMenu.style.display = window.getComputedStyle(hamburgerMenu).display == "none" ? "flex" : "none";
    }, 10)

    this.changeForm()
  }

  public changeForm(){
    const hamburgerButton = document.getElementById("hamburger-button")

    if(!hamburgerButton) return

    hamburgerButton.children[0].classList.contains("hamburger-button-clockwise") ? hamburgerButton.children[0].classList.remove("hamburger-button-clockwise"): hamburgerButton.children[0].classList.add("hamburger-button-clockwise")
    hamburgerButton.children[1].classList.contains("hamburger-button-hide") ? hamburgerButton.children[1].classList.remove("hamburger-button-hide"): hamburgerButton.children[1].classList.add("hamburger-button-hide")
    hamburgerButton.children[2].classList.contains("hamburger-button-anti-clockwise") ? hamburgerButton.children[2].classList.remove("hamburger-button-anti-clockwise"): hamburgerButton.children[2].classList.add("hamburger-button-anti-clockwise")
  }
}
