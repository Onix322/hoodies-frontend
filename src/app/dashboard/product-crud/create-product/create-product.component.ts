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

  @Input() title: String = "";
  @Input() size: String = "";
  @Input() productColor: String = "";
  @Input() description: String = "";
  @Input() price: Number = 0.0;
  @Input() rating: Number = 0;
  @Input() image: String = "";
  @Input() productImages: Array<Object> = [];

  constructor(private productService: ProductService) {
  }

  public createProduct() {

      const productImages = {image: this.image}
      this.addToArray(this.productImages, productImages)

      const product = {
        title: this.title,
        size: this.size.toLocaleUpperCase(),
        productColor: this.productColor.toLocaleUpperCase(),
        description: this.description,
        price: this.price,
        rating: this.rating,
        productImages: this.productImages,
      }

      console.log(product)

      // if(!this.validation(product)) return

      this.productService.post(product)

  }

  public validation(object: any): boolean{

    for (const objectKey in object) {
      if(object[objectKey] == "" || object[objectKey] == null){
        return false
      }
    }

    return true
  }

  public addToArray(array: any, object: any){
    array.push(object)
  }
}
