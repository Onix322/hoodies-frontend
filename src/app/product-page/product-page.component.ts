import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavComponent} from '../nav/nav.component';
import {ProductService} from '../services/product/product.service';
import {CartService} from '../services/cart/cart.service';
import {Redirect} from '../utils/redirect/redirect';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-product-page',
  imports: [
    NavComponent
  ],
  standalone: true,
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {

  @Output() id: number = 0;
  @Output() title: String = "";
  @Output() size: String = "";
  @Output() productColor: String = "";
  @Output() description: String = "";
  @Output() price: Number = 0.0;
  @Output() rating: Number = 0;
  @Output() mainImage: String = "";
  @Output() productImages: Array<any> = [];

  constructor(private authService: AuthService, private redirect: Redirect, private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get("id")

    if(!productId) return
    this.productService.get(Number.parseInt(productId)).subscribe({
      next: (value) => {

        this.id = value.result.id;
        this.title = value.result.title;
        this.size = value.result.size.toLocaleUpperCase();
        this.productColor = value.result.productColor.toLocaleUpperCase();
        this.description = value.result.description;
        this.price = value.result.price;
        this.rating = value.result.rating;
        this.productImages = value.result.productImages;
        this.mainImage = value.result.productImages[0].image
      },
      error: (err) =>{
        console.log(err)
      }
    })

  }

  public addToCart(){

    this.cartService.addToCart({userId: this.authService.getCurrentLoggedUser(), productId: this.id})

  }
}
