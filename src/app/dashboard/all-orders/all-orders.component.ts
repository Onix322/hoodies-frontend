import {Component, Output} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {Notification} from '../../utils/notifications/notification/notification';

@Component({
  selector: 'app-all-orders',
  imports: [],
  standalone: true,
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent {

  @Output() orders: Array<any> = new Array<any>();

  constructor(private orderService: OrderService) {
    this.getAll()
  }

  public getAll(){
    this.orderService.getAllOrders().subscribe({
      next: (value: any) => {
        this.orders = Array.from(value.result)
      }, error: err => {
        console.error(err)
      }
    })
  }

  public deleteOrder(order: any){
    this.orderService.deleteOrder(order.user.id, order.id).subscribe({
      next: () => {
        Notification.notifyValid("Order has been deleted!")
        this.getAll()
      },
      error: (err) => {
        Notification.notifyValid("Order has NOT been deleted!")
        console.log(err)
      }
    })
  }
}
