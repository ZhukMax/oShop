import { Component } from '@angular/core';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;

  constructor(orderService: OrderService) {
    this.orders$ = orderService.getOrders();
  }
}
