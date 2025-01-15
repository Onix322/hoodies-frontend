import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {ProductCrudComponent} from '../product-crud/product-crud.component';
import {NgIf} from '@angular/common';
import {UserCrudComponent} from '../user-crud/user-crud.component';
import {SeeAllProductsComponent} from '../product-crud/see-all-products/see-all-products.component';
import {NavComponent} from '../../nav/nav.component';
import {AuthService} from '../../services/auth/auth.service';
import {UserService} from '../../services/user/user.service';
import {Redirect} from '../../utils/redirect/redirect';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  @ViewChild("content", {read: ViewContainerRef}) content: ViewContainerRef | undefined;
  protected readonly ProductCrudComponent = ProductCrudComponent;

  public activeView: boolean = false;

  constructor(private redirect: Redirect) {
    this.redirect.roleTo("/", "CUSTOMER")
  }

  public renderCrudContent(component: any) {
    if (!this.content) return;
    this.activeView = true;
    this.content.clear()
    this.content.createComponent(component)
  }

  protected readonly UserCrudComponent = UserCrudComponent;
  protected readonly SeeAllProductsComponent = SeeAllProductsComponent;
}
