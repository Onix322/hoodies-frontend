import {Component} from '@angular/core';
import {CollectionComponent} from './collection/collection.component';
import {FormsModule} from '@angular/forms';
import {SendFromComponent} from '../send-from/send-from.component';

@Component({
  selector: 'app-content',
  imports: [
    CollectionComponent,
    FormsModule,
    SendFromComponent,
  ],
  templateUrl: './content.component.html',
  standalone: true,
  styleUrl: './content.component.css'
})
export class ContentComponent {
}
