import { map } from 'rxjs/operators';
import { Product, ProductId } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    return this.db.list('products').push(product);
  }

  get(id: string): Observable<unknown> {
    return this.db.object('/products/' + id).valueChanges();
  }

  getAll() {
    return this.db.list('/products').snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const product = (action.payload.val() as Product);

        return ({
            id: action.key,
            title: product.title,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl
          } as ProductId);
      });
    }));
  }

  update(id: string, product: Product) {
    return this.db.object('/products/' + id).update(product);
  }

  delete(id: string) {
    return this.db.object('/products/' + id).remove();
  }
}
