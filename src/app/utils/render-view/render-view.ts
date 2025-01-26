import {ComponentRef, Injectable, ViewChild, ViewContainerRef} from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class RenderView {

  private undefinedErrorMsg = "you must have defined '#content' in tag"
  private _contentElement: ViewContainerRef | undefined;
  private _activeView: string = "";


  constructor() {}

  public render(component: any) {

    if (!this._contentElement) return console.error(this.undefinedErrorMsg);

    this._activeView = component.name;
    console.log(this._activeView)

    this._contentElement.clear()

    this._contentElement.createComponent(component)
  }

  get activeView(): string {
    return this._activeView;
  }

  get getContentElement(): ViewContainerRef {
    if (!this._contentElement) {
      throw new Error(this.undefinedErrorMsg)
    }
    return this._contentElement
  }

  set setContentElement(value: ViewContainerRef | undefined) {
    if (!value) {
      throw new Error(this.undefinedErrorMsg)
    }
    this._contentElement = value;
  }
}
