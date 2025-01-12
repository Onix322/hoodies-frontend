import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product/product.service';
import {ProductBoxComponent} from '../../../utils/product-box/product-box.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-see-all-products',
  imports: [
    ProductBoxComponent,
    NgIf
  ],
  standalone: true,
  templateUrl: './see-all-products.component.html',
  styleUrl: './see-all-products.component.css'
})
export class SeeAllProductsComponent implements OnInit{
  protected readonly JSON = JSON;
  protected products: Array<any> = new Array<any>();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProducts().then(e =>{
      console.log("Products found!")
    })
      .catch(err =>{
        console.log(err.error.message)
      })
  }

  public async getAllProducts(){
    this.productService.getAll().subscribe({
      next: (value: any) => {
        this.products = Array.from(value.result)
        console.log(this.products)
        console.log(this.products)
      },
      error: (err) => {
        console.log(err)
      }
    })


  }

}
