import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order: any){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(){
    return this.db.list('/orders').snapshotChanges()
    .pipe(map(data => {
      return data.map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.exportVal() };
        return data;
      });
    }));
    // here we simply return the list of orders from Firebase
  }

  deleteOrder(id: string) {
    return this.db.list('/orders/' + id).remove();
  }

  getOrderById(orderId: string) {
    return this.db.object('/orders/' + orderId).valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges().pipe(map(data => {
        return data.map(action => {
          const $key = action.payload.key;
          const data = { $key, ...action.payload.exportVal() };
          return data;
        });
      }));
  }

}
