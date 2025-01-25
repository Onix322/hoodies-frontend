import { Component } from '@angular/core';
import {SeeProductsButtonComponent} from '../utils/buttons/see-products-button/see-products-button.component';
import {NavComponent} from '../nav/nav.component';

@Component({
  selector: 'app-not-found-page',
  imports: [
    SeeProductsButtonComponent,
    NavComponent
  ],
  standalone: true,
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css'
})
export class NotFoundPageComponent {

}
