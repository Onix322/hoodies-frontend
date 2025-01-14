import {Routes} from '@angular/router';
import {AllProductsPageComponent} from './all-products-page/all-products-page.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  {
    path: 'products',
    component: AllProductsPageComponent,
    pathMatch: "full"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: "full"
  },
  {
    path: 'product/:id',
    component: ProductPageComponent,
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: "full"
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: "full"
  }
];
