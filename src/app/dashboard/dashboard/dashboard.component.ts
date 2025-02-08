import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {ProductCrudComponent} from '../product-crud/product-crud.component';
import {NgIf} from '@angular/common';
import {UserCrudComponent} from '../user-crud/user-crud.component';
import {SeeAllProductsComponent} from '../product-crud/see-all-products/see-all-products.component';
import {NavComponent} from '../../nav/nav.component';
import {RenderView} from '../../utils/render-view/render-view';
import {AllOrdersComponent} from '../all-orders/all-orders.component';

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

  constructor(private render: RenderView) {

  }

  public renderCrudContent(component: any) {

    this.render.setContentElement = this.content

    this.render.render(component)
  }

  public getCurrentView(){
    return this.render.activeView
  }

  protected readonly AllOrdersComponent = AllOrdersComponent;
}
