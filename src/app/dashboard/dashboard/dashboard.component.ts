import {Component, ComponentRef, createComponent, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ProfileButtonComponent} from '../../utils/buttons/profile-button/profile-button.component';
import {CreateProductComponent} from '../product-crud/create-product/create-product.component';
import {DeleteProductComponent} from '../product-crud/delete-product/delete-product.component';
import {GetProductComponent} from '../product-crud/get-product/get-product.component';
import {EditProductComponent} from '../product-crud/edit-product/edit-product.component';
import {GetAllProductsComponent} from '../product-crud/get-all-products/get-all-products.component';
import {CreateUserComponent} from '../user-crud/create-user/create-user.component';
import {DeleteUserComponent} from '../user-crud/delete-user/delete-user.component';
import {GetUserComponent} from '../user-crud/get-user/get-user.component';
import {GetAllUsersComponent} from '../user-crud/get-all-users/get-all-users.component';
import {EditUserComponent} from '../user-crud/edit-user/edit-user.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProfileButtonComponent, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  @ViewChild("content", {read: ViewContainerRef}) content: ViewContainerRef | undefined;
  protected readonly CreateUserComponent = CreateUserComponent;
  protected readonly CreateProductComponent = CreateProductComponent;
  protected readonly GetProductComponent = GetProductComponent;
  protected readonly GetAllUsersComponent = GetAllUsersComponent;
  protected readonly GetAllProductsComponent = GetAllProductsComponent;
  protected readonly DeleteProductComponent = DeleteProductComponent;
  protected readonly EditProductComponent = EditProductComponent;
  protected readonly GetUserComponent = GetUserComponent;
  protected readonly DeleteUserComponent = DeleteUserComponent;
  protected readonly EditUserComponent = EditUserComponent;
  public activeView: boolean = false;

  public renderCrudContent(component: any) {
    if (!this.content) return;
    this.activeView = true;
    this.content.clear()
    this.content.createComponent(component)
  }
}
