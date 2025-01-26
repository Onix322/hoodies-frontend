import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {ProductCrudComponent} from '../product-crud/product-crud.component';
import {NgIf} from '@angular/common';
import {UserCrudComponent} from '../user-crud/user-crud.component';
import {SeeAllProductsComponent} from '../product-crud/see-all-products/see-all-products.component';
import {NavComponent} from '../../nav/nav.component';
import {Redirect} from '../../utils/redirect/redirect';
import {RenderView} from '../../utils/render-view/render-view';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  @ViewChild("content", {read: ViewContainerRef})
  content: ViewContainerRef | undefined;

  protected readonly ProductCrudComponent = ProductCrudComponent;
  protected readonly UserCrudComponent = UserCrudComponent;
  protected readonly SeeAllProductsComponent = SeeAllProductsComponent;

  constructor(private redirect: Redirect, private render: RenderView) {
    this.redirect.toIfNotAuth("/login")
    this.redirect.roleTo("/", "CUSTOMER")
  }

  public renderCrudContent(component: any) {

    this.render.setContentElement = this.content

    this.render.render(component)
  }

  public getCurrentView(){
    return this.render.activeView
  }
}
