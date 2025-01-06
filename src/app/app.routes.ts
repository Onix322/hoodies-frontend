import {Routes} from '@angular/router';
import {AllProductsPageComponent} from './all-products-page/all-products-page.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {
    path: 'products',
    component: AllProductsPageComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];
