import {Component} from '@angular/core';
import {NavComponent} from '../nav/nav.component';
import {ProductBoxComponent} from '../product-box/product-box.component';
import {FooterComponent} from '../utils/footer/footer.component';

@Component({
  selector: 'app-all-products-page',
  standalone: true,
  imports: [NavComponent, ProductBoxComponent, FooterComponent],
  templateUrl: './all-products-page.component.html',
  styleUrl: './all-products-page.component.css'
})
export class AllProductsPageComponent {

}
