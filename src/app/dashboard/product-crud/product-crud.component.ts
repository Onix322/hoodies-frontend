import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product/product.service';

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



  private formElements: Array<HTMLFormElement> = new Array<HTMLFormElement>()
  constructor(private productService: ProductService) {

  }

  ngAfterViewInit() {

    ////////////
    //fa functia sa nu mai aiba nevoie de pre-validator ci sa treaca peste null or unidetified
    ////////////

    validate("register-product")
  }

  public createProduct() {

    if(!validate('register-products')) return

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
    console.log(array)
    validate('register-products')
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

function validate(nameForm: string){

  const form = document.forms.namedItem(nameForm)

  if(!form) {
    console.error(nameForm + " form not found")
    return
  }

  const inputs = form.getElementsByTagName('input')
  const selects = form.getElementsByTagName('select')
  const textAreas = form.getElementsByTagName('textarea')

  let invalidBorderValue = "1px solid red"
  let validBorderValue = "1px solid green"

  const check = (array:HTMLCollectionOf<any> | undefined) => {

    if(!array) {
      console.error(array + " is undefined")
      return
    }

    for (const element of array) {
      if (!element) continue
      const message = document.createElement('p')
      message.innerHTML = <string>element.dataset['invalidMessage']
      message.style.color = "red"
      message.style.margin = "0"

      element.addEventListener('input', () => {
        if (element.checkValidity()) {
          message.remove()
          element.style.border = validBorderValue;
        } else {
          element.parentElement?.appendChild(message)
          element.style.border = invalidBorderValue;
        }
      })
    }
  }

  check(inputs)
  check(selects)
  check(textAreas)

  console.log(form.checkValidity())
  return form.checkValidity()
}


