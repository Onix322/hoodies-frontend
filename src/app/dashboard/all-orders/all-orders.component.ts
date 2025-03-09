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

  @Output() protected orders: Array<any> = new Array<any>();
  protected title = "Change order status:"
  protected orderId: number = 0;
  protected status = "";

  constructor(private orderService: OrderService) {
    setTimeout(() => this.ordersInitializer(), 200)
  }

  public ordersInitializer() {
    this.orderService.getAllOrders().subscribe({
      next: (value: any) => {
        this.orders = Array.from(value.result)
        console.log(value)
      }, error: err => {
        console.error(err)
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
      statusOrder: this.status,
    }

    console.log(body)
    this.orderService.changeStatus(body).subscribe({
      next: () => {
        Notification.notifyValid("Order's status has been changed")
        this.status = "";
        this.ordersInitializer()
        this.closePopup()
      },
      error: () => {
        Notification.notifyInvalid("Something went wrong!")
      }
    })
  }
}
