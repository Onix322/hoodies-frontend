import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {CollectionComponent} from './content/collection/collection.component';
import {ContentComponent} from './content/content.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ContentComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hoodies';
}
