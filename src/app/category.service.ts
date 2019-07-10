import { Category, CategoryId } from './models/category';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) { }

  getCategories(): Observable<CategoryId[]> {
    return this.db.list('/categories', ref => {
      return ref.orderByChild('name');
    }).snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        return ({
            id: action.key,
            name: (action.payload.val() as Category).name
          } as CategoryId);
      });
    }));
  }
}
