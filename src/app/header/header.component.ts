import {AfterViewInit, Component} from '@angular/core';
import {SeeProductsButtonComponent} from '../utils/buttons/see-products-button/see-products-button.component';
import {NavComponent} from '../nav/nav.component';

@Component({
  selector: 'app-header',
  imports: [SeeProductsButtonComponent, NavComponent],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.leftSideElementResponsive()
    slider()
  }

  private leftSideElementResponsive(): void {
    let leftSideElement = document.getElementById("left-side-header")

    if (!leftSideElement) return;

    applyLeftPadding(leftSideElement, 733)
    this.refreshOnResize(() => applyLeftPadding(leftSideElement, 733))

  }

  private refreshOnResize(param: Function) {
    window.addEventListener("resize", () => param())
  }
}

function applyLeftPadding(element: HTMLElement, width: number) {
  if (window.innerWidth >= 801) {
    element.style.paddingLeft = `${(window.innerWidth / 2) - width - 50}px`;
  } else {
    element.style.paddingLeft = "0"
  }
}

function slider(): void {

  const sliderImages = document.getElementById("slider-images")
  const sliderControls = document.getElementById("slider-controls")

  if (!sliderControls || !sliderImages) return
  const images = Array.from(sliderImages.children)
  const controls = Array.from(sliderControls.children)

  let index = 0;
  let ms = 4000
  let pauseAfterPressing = 2; // multiply by X

  //automation of sliders
  let interval = setInterval(intervalFunc, ms)

  //pressing buttons
  controls.forEach(ele => {
    ele.addEventListener("click", () => {
      index = controls.indexOf(ele)
      removeClass(images, "slider-img-active")
      removeClass(controls, "slider-button-active")

      addClass(images[index], "slider-img-active")
      addClass(controls[index], "slider-button-active")

      interval = pauseInterval(interval, ms, pauseAfterPressing, intervalFunc)
    })
  })

  function intervalFunc() {
    removeClass(images, "slider-img-active")
    removeClass(controls, "slider-button-active")

    // console.log(index)
    let childImg = images[index]
    let childControls = controls[index]

    addClass(childImg, "slider-img-active")
    addClass(childControls, "slider-button-active")

    if (index == images.length - 1) index = 0;
    else index++

  }
}

//reusable functions

function pauseInterval(interval: any, intervalMilis: number, milisPause: number, intervalFunc: Function) {

  let waitingTime = intervalMilis * milisPause;

  clearInterval(interval)

  interval = setInterval(intervalFunc, waitingTime)

  let timeout = setTimeout(() => {
    clearInterval(interval)
  }, waitingTime)

  clearTimeout(timeout)

  return interval;
}

function removeClass(elementArray: Element[], className: string) {
  elementArray.forEach(ele => {
    ele.classList.remove(className)
  })
}

function addClass(element: Element, className: string) {
  element.classList.add(className)
}
