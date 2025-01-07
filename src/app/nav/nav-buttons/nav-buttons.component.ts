import { Component } from '@angular/core';
import {CartButtonComponent} from '../../utils/buttons/cart-button/cart-button.component';
import {ProfileButtonComponent} from '../../utils/buttons/profile-button/profile-button.component';

@Component({
    selector: 'app-nav-buttons',
    imports: [CartButtonComponent, ProfileButtonComponent],
    templateUrl: './nav-buttons.component.html',
    standalone: true,
    styleUrl: './nav-buttons.component.css'
})
export class NavButtonsComponent {

}
