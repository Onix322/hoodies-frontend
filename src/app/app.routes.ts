import {Routes} from '@angular/router';
import {AllProductsPageComponent} from './all-products-page/all-products-page.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {CartComponent} from './cart/cart.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {authGuard} from './guard/auth-guard.guard';
import {FinalizeOrderPageComponent} from './finalize-order-page/finalize-order-page.component';

export const routes: Routes = [
  {
    path: 'products',
    component: AllProductsPageComponent,
    pathMatch: "full"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
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
    path: 'register',
    component: RegisterComponent,
    pathMatch: "full",
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    pathMatch: "full",
    canActivate: [authGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    pathMatch: "full",
    canActivate: [authGuard]
  },
  {
    path: 'finalize-order',
    component: FinalizeOrderPageComponent,
    pathMatch: "full",
    canActivate: [authGuard]
  },
  {
    path: 'home',
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: '',
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: '**',
    pathMatch: "full",
    component: NotFoundPageComponent
  },
  {path: '404', component: NotFoundPageComponent},
];
