import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {}

  async ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.orders$ = this.orderService.getOrdersByUser(user.uid);
    });
  }
}
