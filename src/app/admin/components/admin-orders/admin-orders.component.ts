import { OrderService } from 'shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Order } from 'shared/models/order';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$!: Observable<any[]>;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(){
    this.orders$ = this.orderService.getOrders();
  }

  deleteOrder(order: Order) {
    this.orderService.deleteOrder(order.$key)
      .then(data => {
        console.log(data);
      });
  }
}
