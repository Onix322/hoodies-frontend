import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavComponent} from '../nav/nav.component';
import {ProductService} from '../services/product/product.service';
import {CartService} from '../services/cart/cart.service';
import {AuthService} from '../services/auth/auth.service';
import {Notification} from '../utils/notifications/notification/notification';
import {BehaviorSubject, switchMap, take, tap} from 'rxjs';
import {ReviewService} from '../services/product/review.service';
import {PopupComponent} from '../utils/popup/popup.component';
import {FormsModule} from '@angular/forms';
import {FooterComponent} from '../utils/footer/footer.component';
import {NgIf} from '@angular/common';
import {ProductStarRatingComponent} from '../utils/product-box/product-star-rating/product-star-rating.component';

@Component({
  selector: 'app-product-page',
  imports: [
    NavComponent,
    PopupComponent,
    FormsModule,
    FooterComponent,
    NgIf,
    ProductStarRatingComponent
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
  @Output() rating: number = 0;
  @Output() numberReviews: number = 0;
  @Output() mainImage: String = "";
  @Output() availableForPurchase: boolean = false;
  @Output() productImages: Array<any> = [];

  @Input() reviewMessage: string = "";
  @Input() reviewScore: number = 1;
  protected reviewId: number = 0;

  @ViewChild("createReviewPopup", {read: PopupComponent})
  private createReviewPopup: PopupComponent | undefined;
  private userId: number = 0;

  protected reviews: BehaviorSubject<Array<any>> = new BehaviorSubject(new Array<any>());

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private productService: ProductService, private cartService: CartService, private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.userIdInitializer()
    this.productInitializer()
    this.reviewsInitializer()
  }

  public addToCart() {
    this.cartService.addToCartImpl(this.id)
      .subscribe({
        next: () => {
          Notification.notifyValid("Product added to cart!")
        },
        error: () => {
          Notification.notifyInvalid("Product could not be added to cart!")
        }
      })
  }

  public userIdInitializer() {
    this.authService.getCurrentLoggedUser()
      .subscribe(value => this.userId = value)
  }

  public productInitializer() {
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
        this.numberReviews = value.result.numberReviews;
        this.availableForPurchase = value.result.availableForPurchase;
        this.productImages = value.result.productImages;
        this.mainImage = value.result.productImages[0].image
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  public reviewsInitializer() {
    let productId = this.route.snapshot.paramMap.get("id")

    if (!productId) return

    this.reviewService.getReviewsFor(Number.parseInt(productId))
      .subscribe({
        next: value => {
          this.reviews.next(value.result)
          console.log(value.result.reverse())
        },
        error: err => {
          console.log(err)
        }
      })
  }

  public openCreateReviewPopup() {
    this.reviewId = 0;
    this.reviewMessage = "";
    this.reviewScore = 0;

    this.authService.isAuth()
      .pipe(
        take(1)
      )
      .subscribe({
        next: (value) => {
          if (value) {
            this.createReviewPopup?.open()
          } else {
            this.router.navigateByUrl("/login", {skipLocationChange: true, replaceUrl: false})
          }
        }
      })
  }

  public createReview() {

    let productId = this.route.snapshot.paramMap.get("id")

    if (!productId) return

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
          if (!status) {
            this.router.navigateByUrl("/login", {skipLocationChange: true, replaceUrl: false})
            return;
          }
        }),
        take(1),
        switchMap(() => {
          body.user.id = this.userId
          console.log(body)
          return this.reviewService.create(body)
        }),
      )
      .subscribe({
        next: (value) => {
          Notification.notifyValid("Review added!")
          this.reviewsInitializer()
          this.createReviewPopup?.close()
        },
        error: err => {
          Notification.notifyInvalid("Review not added! Something went wrong!")
        }
      })
  }

  public editReview(reviewId: number) {
    this.openCreateReviewPopup()
    this.reviewId = reviewId;


    this.reviewService.getReview(reviewId)
      .subscribe({
        next: (value) => {
          this.reviewMessage = value.result.message
          this.reviewScore = value.result.score
        }
      })
  }

  public saveReview() {
    const body = {
      reviewId: this.reviewId,
      message: this.reviewMessage,
      score: this.reviewScore
    }

    this.reviewService.update(body)
      .subscribe({
        next: () => {
          Notification.notifyValid("Review updated!")
          this.reviewsInitializer()
          this.createReviewPopup?.close()
        },
        error: err => {
          Notification.notifyInvalid("Review not updated!")
          console.log(err)
        }
      })
  }

  public isReviewOwner(reviewOwnerId: number) {
    return this.userId == reviewOwnerId
  }
}
