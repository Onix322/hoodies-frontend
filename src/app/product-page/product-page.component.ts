import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavComponent} from '../nav/nav.component';
import {ProductService} from '../services/product/product.service';
import {CartService} from '../services/cart/cart.service';
import {AuthService} from '../services/auth/auth.service';
import {Notification} from '../utils/notifications/notification/notification';
import {BehaviorSubject, switchMap, take, tap} from 'rxjs';
import {ReviewService} from '../services/product/review.service';
import {ThisReceiver} from '@angular/compiler';
import {PopupComponent} from '../utils/popup/popup.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-page',
  imports: [
    NavComponent,
    PopupComponent,
    FormsModule
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

  @Input() reviewMessage: string = "";
  @Input() reviewScore: number = 1;

  @ViewChild("createReviewPopup", {read: PopupComponent})
  private createReviewPopup: PopupComponent | undefined;

  protected reviews: BehaviorSubject<Array<any>> = new BehaviorSubject(new Array<any>());

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private productService: ProductService, private cartService: CartService, private review: ReviewService) {
  }

  ngOnInit(): void {
    this.productInitializer()
    this.reviewsInitializer()
  }

  public addToCart() {
    this.cartService.addToCartImpl(this.id).subscribe({
      next: () => {
        Notification.notifyValid("Product added to cart!")
      },
      error: () => {
        Notification.notifyInvalid("Product could not be added to cart!")
      }
    })
  }

  public productInitializer(){
    let productId = this.route.snapshot.paramMap.get("id")

    if (!productId) return
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
      error: (err) => {
        console.log(err)
      }
    })
  }

  public reviewsInitializer(){
    let productId = this.route.snapshot.paramMap.get("id")

    if(!productId) return

    this.review.getReviewsFor(Number.parseInt(productId))
      .subscribe({
        next: value => {
          this.reviews.next(value.result)
          console.log(value.result)
        },
        error: err => {
          console.log(err)
        }
      })
  }

  public openCreateReviewPopup(){
    this.authService.isAuth()
      .subscribe({
        next: (value) =>{
          if(value) {
            this.createReviewPopup?.open()
          } else {
            this.router.navigateByUrl("/login", {skipLocationChange: true, replaceUrl: false})
          }
        }
      })
  }

  public createReview(){

    let productId = this.route.snapshot.paramMap.get("id")
    let userId = 0;

    if(!productId) return

    const body = {
      id: null,
      message: this.reviewMessage,
      score: this.reviewScore,
      product: {
        id: productId
      },
      user: {
        id: 0
      }
    }

    this.authService.isAuth()
      .pipe(
        take(1),
        tap((status) => {
          if(!status) {
            this.router.navigateByUrl("/login", {skipLocationChange: true, replaceUrl: false})
            return;
          }
        }),
        switchMap(() => {
          return this.authService.getCurrentLoggedUser()
        }),
        take(1),
        switchMap((user) => {
          body.user.id = user
          console.log(body)
          return this.review.create(body)
        }),
      )
      .subscribe({
        next: (value) => {
          Notification.notifyValid("Review added!")
        },
        error: err => {
          Notification.notifyInvalid("Review not added! Something went wrong!")
        }
    })
  }
}
