import {Routes} from '@angular/router';
import {AllProductsPageComponent} from './all-products-page/all-products-page.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'products',
    component: AllProductsPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];
