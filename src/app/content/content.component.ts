import { Component } from '@angular/core';
import {CollectionComponent} from './collection/collection.component';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-content',
  imports: [
    CollectionComponent,
    FormsModule
  ],
    templateUrl: './content.component.html',
    standalone: true,
    styleUrl: './content.component.css'
})
export class ContentComponent {

    protected readonly CollectionComponent = CollectionComponent;
}
