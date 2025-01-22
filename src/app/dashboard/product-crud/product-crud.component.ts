import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product/product.service';
import {FormValidator} from '../../utils/form-validator/form-validator';

@Component({
  selector: 'app-create-product',
  imports: [
    FormsModule
  ],
  templateUrl: './product-crud.component.html',
  standalone: true,
  styleUrl: './product-crud.component.css'
})
export class ProductCrudComponent implements AfterViewInit{

  @Input() id: number = 0;
  @Input() title: String = "";
  @Input() size: String = "";
  @Input() productColor: String = "";
  @Input() description: String = "";
  @Input() price: Number = 0.0;
  @Input() rating: Number = 0;
  @Input() image: String = "";
  @Input() productImages: Array<any> = [];
  @Input() productIdEntered: number = 0;

  constructor(private productService: ProductService, private validator: FormValidator) {

  }

  ngAfterViewInit() {
    this.validator.validate("register-product", Array.of("product-images"))
    this.validator.validateElementIf("productImageField", () => this.productImages.length > 0)
  }

  public createProduct() {

    if(!this.validator.validateElementIf("productImageField", () => this.productImages.length > 0)) return;
    if(!this.validator.validate("register-product", Array.of("product-images"))) return

    const product = {
      id: 0,
      title: this.title,
      size: this.size.toLocaleUpperCase(),
      productColor: this.productColor.toLocaleUpperCase(),
      description: this.description,
      price: this.price,
      rating: this.rating,
      productImages: this.productImages,
    }

    if (this.id < 1) {
      this.productService.post(product)
    } else {
      product.id = this.id
      this.productService.edit(product)
    }
    this.clear()
  }

  public deleteProduct() {
    this.productService.delete(this.productIdEntered)
    this.clear()
  }

  public async getProduct() {

    this.productService.get(this.productIdEntered).subscribe({
      next: (value) => {

        this.clear()

        this.id = value.result.id;
        this.title = value.result.title;
        this.size = value.result.size;
        this.productColor = value.result.productColor.toString().substring(0, 1) + value.result.productColor.toString().substring(1).toLowerCase();
        this.description = value.result.description;
        this.price = value.result.price;
        this.rating = value.result.rating;

        value.result.productImages.forEach((image: any) => {
          this.productImages.push(JSON.parse(JSON.stringify(image)))
        })
      },

      error: (err) => {
        console.log(err.error.message)
      }
    })
  }

  public addToArray(array: Array<any>, object: any) {

    array.push(object)
    if(!this.validator.validateElementIf("productImageField", () => this.productImages.length > 0)) return;
  }

  public deleteFromArray(array: Array<any>, index: any) {
    if (index > -1) { // only splice array when item is found
      array.splice(index, index + 1); // 2nd parameter means remove one item only
    }
  }

  public clear() {
    this.id = 0;
    this.title = "";
    this.size = "";
    this.productColor = "";
    this.description = "";
    this.price = 0.0;
    this.rating = 0;
    this.image = "";
    this.productImages = [];
    this.productIdEntered = 0;
  }
}


