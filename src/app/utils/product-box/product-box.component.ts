import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent {
  @Input() id: String = "";
  @Input() title: String = "";
  @Input() size: String = "";
  @Input() price: String = "";
  @Input() rating: String = "";
  @Input() productImage: String = "";
}
