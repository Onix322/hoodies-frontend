import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../../services/product/product.service';

@Component({
    selector: 'app-create-product',
    imports: [
      FormsModule
    ],
    templateUrl: './create-product.component.html',
    standalone: true,
    styleUrl: './create-product.component.css'
})
export class CreateProductComponent {

  @Input() title:String = "";
  @Input() size:String = "";
  @Input() productColor:String = "";
  @Input() description:String = "";
  @Input() price:Number = 0.0;
  @Input() rating:Number = 0;
  @Input() productImages: Array<Blob> = [];

  constructor(private productService: ProductService) {
  }

  public createProduct(){

    const product = {
      title: this.title,
      size: this.size.toLocaleUpperCase(),
      productColor: this.productColor.toLocaleUpperCase(),
      description: this.description,
      price: this.price,
      rating: this.rating,
      productImages: this.productImages,
    }

    this.productService.post(product)
  }
}
