import {Component, Input} from '@angular/core';
import {ProductService} from '../../../services/product/product.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-delete-product',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {

  @Input() productId: number | undefined;

  constructor(private productService: ProductService){
  }

  public deleteProduct(){
    if(this.productId == undefined) return
    this.productService.delete(this.productId)
  }
}
