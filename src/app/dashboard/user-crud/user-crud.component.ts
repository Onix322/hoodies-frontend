import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RenderView} from '../../utils/render-view/render-view';
import {CreateUserComponent} from './create-user/create-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';

@Component({
  selector: 'app-user-crud',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent {

  @ViewChild("userCrudContent", {read: ViewContainerRef})
  userCrudContent: ViewContainerRef | undefined;
  protected readonly CreateUserComponent = CreateUserComponent;
  protected readonly EditUserComponent = EditUserComponent;

  constructor(private render: RenderView) {
  }

  public renderUserCrudContent(component: any) {
    this.render.setContentElement = this.userCrudContent
    this.render.render(component)
  }
}
