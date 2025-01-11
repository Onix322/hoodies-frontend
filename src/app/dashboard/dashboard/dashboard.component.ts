import {Component, ComponentRef, createComponent, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ProfileButtonComponent} from '../../utils/buttons/profile-button/profile-button.component';
import {ProductCrudComponent} from '../product-crud/product-crud.component';
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
  protected readonly CreateProductComponent = ProductCrudComponent;

  public activeView: boolean = false;

  public renderCrudContent(component: any) {
    if (!this.content) return;
    this.activeView = true;
    this.content.clear()
    this.content.createComponent(component)
  }

  protected readonly ProductCrudComponent = ProductCrudComponent;
}
