import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product/product.service';
import {FormValidator} from '../../utils/form-validator/form-validator';
import {Notification} from '../../utils/notifications/notification/notification';
import {NgIf} from '@angular/common';

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
  @Input() availableForPurchase: boolean = false;
  @Input() numberReviews: number = 0;
  @Input() productImages: Array<any> = [];
  @Input() productIdEntered: number = 0;

  constructor(private productService: ProductService, private validator: FormValidator) {

  }

  ngAfterViewInit() {
    this.validator.validate("register-product", Array.of("product-images"))
    this.validator.validateElementIf("product-images", () => this.productImages.length > 0)
  }

  public saveProduct() {
    console.log(this.productImages)
    if(!this.validator.validate("register-product", Array.of("product-images"))) {
      Notification.notifyInvalid("Please complete all fields before saving!")
      return
    }

    if(!this.validator.validateElementIf("product-images", () => this.productImages.length > 0)) {
      Notification.notifyInvalid("Please add at least 1 image!")
      return
    }

    const product = {
      id: 0,
      title: this.title,
      size: this.size.toLocaleUpperCase(),
      productColor: this.productColor.toLocaleUpperCase(),
      description: this.description,
      price: this.price,
      rating: this.rating,
      availableForPurchase: this.availableForPurchase,
      productImages: this.productImages,
      numberReviews: this.numberReviews,
    }

    if (this.id < 1) {
      this.createProduct(product)
    } else {
      this.editProduct(product)
    }
    this.clear()
  }

  private createProduct(body: any){
    this.productService.post(body).subscribe({
      next: () =>{
        Notification.notifyValid("Product created!")
      },
      error: () =>{
        Notification.notifyInvalid("Product not created!")
      }
    })
  }

  private editProduct(body: any){
    body.id = this.id
    this.productService.edit(body).subscribe({
      next: () => {
        console.log(this.productImages)
        Notification.notifyValid("Product edited!")
      },
      error: () =>{
        Notification.notifyInvalid("Product not edited!")
      }
    })
  }

  public deleteProduct() {

    if(this.id <=0 ){
      Notification.notifyInvalid("Get product's information first!")
      return
    }

    this.productService.delete(this.id)
      .subscribe({
        next: () =>{
          Notification.notifyValid("Product has been deleted!")
        },
        error: () =>{
          Notification.notifyInvalid("Product has not been deleted!")
        },
      })
    this.clear()
  }

  public getProduct() {

    this.productService.get(this.productIdEntered).subscribe({
      next: (value) => {

        this.clear()

        this.id = value.result.id;
        this.title = value.result.title;
        this.size = value.result.size;
        this.productColor = value.result.productColor;
        this.description = value.result.description;
        this.price = value.result.price;
        this.rating = value.result.rating;
        this.numberReviews = value.result.numberReviews
        this.availableForPurchase = value.result.availableForPurchase;

        value.result.productImages.forEach((image: any) => {
          this.productImages.push(JSON.parse(JSON.stringify(image)))
        })

        this.validator.validateElementIf("product-images", () => this.productImages.length > 0)

        Notification.notifyValid("Product found!")
      },

      error: (err) => {
        console.log(err.error.message)
        Notification.notifyInvalid("Product with id " + this.productIdEntered + " not found! Id: ")
        this.clear()
      }
    })
  }

  public addToArray(array: Array<any>, link: String) {

    if(link.trim().length == 0){
      Notification.notifyInvalid("Product image filed should not be empty!")
      return
    }
    array.push({image: link})
    this.validator.validateElementIf("product-images", () => this.productImages.length > 0);

  }

  public deleteFromArray(array: Array<any>, index: any) {
    if (index > -1) { // only splice array when item is found
      array.splice(index, index + 1); // 2nd parameter means remove one item only
      this.validator.validateElementIf("product-images", () => this.productImages.length > 0)
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
    this.availableForPurchase = false;
    this.numberReviews = 0;
    this.productImages = [];
  }
}


