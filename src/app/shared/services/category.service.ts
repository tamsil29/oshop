import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories', (ref) => ref.orderByChild('name')).snapshotChanges()
    .pipe(
    map((actions: any[]) => {
        return actions.map((action) => ({
            key: action.key,
            val: action.payload.val(),
        }));
    }));
  }
}
