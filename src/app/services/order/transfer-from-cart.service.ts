import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferFromCartService {

  private _productsIds: Array<any> = new Array<any>();

  constructor() { }

  get productsIds(): Array<any> {
    return this._productsIds;
  }

  set productsIds(value: Array<any>) {
    this._productsIds = value;
  }
}
