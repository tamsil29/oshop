import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any){
    this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[] | any>{
    return this.db.list<Product>('/products').snapshotChanges()
    .pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  get(productId: any){
    return this.db.object('/products/' + productId);
  }

  update(productId:any, product:any){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: any){
    return this.db.object('/products/' + productId).remove();
  }
}
