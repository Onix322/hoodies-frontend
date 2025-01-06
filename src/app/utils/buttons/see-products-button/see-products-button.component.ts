import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-see-products-button',
  imports: [
    RouterLink
  ],
  templateUrl: './see-products-button.component.html',
  standalone: true,
  styleUrl: './see-products-button.component.css'
})
export class SeeProductsButtonComponent {

}
