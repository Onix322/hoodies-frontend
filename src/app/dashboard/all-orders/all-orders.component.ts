import {Component, Output, ViewChild} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {Notification} from '../../utils/notifications/notification/notification';
import {NgIf} from '@angular/common';
import {PopupComponent} from '../../utils/popup/popup.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-all-orders',
  imports: [
    NgIf,
    PopupComponent,
    FormsModule
  ],
  standalone: true,
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent {

  @ViewChild(PopupComponent, {read: PopupComponent})
  private popup: PopupComponent | undefined;

  @Output() orders: Array<any> = new Array<any>();
  protected title = "Change order status:"
  protected orderId: number = 0;
  protected status = "";

  constructor(private orderService: OrderService) {
    this.getAll()
  }

  public getAll() {
    this.orderService.getAllOrders().subscribe({
      next: (value: any) => {
        this.orders = Array.from(value.result)
      }, error: err => {
        console.error(err)
      }
    })
  }

  public deleteOrder(order: any) {
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

  public openPopup(order: any) {
    this.popup?.open()
    this.orderId = order.id;
    this.status = order.status;
  }

  public closePopup() {
    this.popup?.close()
  }

  public saveStatus() {

    const body = {
      orderId: this.orderId,
      status: this.status,
    }

    console.log(body)
    this.orderService.changeStatus(body).subscribe({
      next: () => {
        Notification.notifyValid("Order's status has been changed")
        this.status = "";
        this.getAll()
        this.closePopup()
      },
      error: () => {
        Notification.notifyInvalid("Something went wrong!")
      }
    })
  }
}
