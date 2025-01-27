import {Component, Input, ViewChild, ViewContainerRef} from '@angular/core';


//////////////////////////////////////
// for using popup you need to add the <app-popup></app-popup> tag in html
// and add @ViewChild(PopupComponent, {read: PopupComponent}) in .ts file
// and field private popup: PopupComponent | undefined;
//////////////////////////////////////

@Component({
  selector: 'app-popup',
  imports: [],
  standalone: true,
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  @ViewChild('popup', {read: ViewContainerRef})
  private dialog: ViewContainerRef | undefined;

  public open(){
    if(!this.dialog) throw new Error("Dialog element does not exists!");

    this.dialog.element.nativeElement.parentElement.style.display = "block";
    this.dialog.element.nativeElement.open = true
  }

  public close(){
    if(!this.dialog) throw new Error("Dialog element does not exists!");

    this.dialog.element.nativeElement.parentElement.style.display = "none";
    this.dialog.element.nativeElement.open = false
  }

  public isOpen(){
    if(!this.dialog) throw new Error("Dialog element does not exists!");

    let element: HTMLDialogElement = <HTMLDialogElement>this.dialog.element.nativeElement

    return element.open
  }
}
