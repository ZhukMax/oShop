import { ShoppingCart } from './models/shopping-cart';
import { ProductId } from './models/product';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {}

  async get(): Promise<Observable<ShoppingCart>> {
    const id = await this.getOrCreateCartId();
    return (this.db.object('/shopping-carts/' + id).valueChanges() as Observable<ShoppingCart>)
      .pipe(map(x => new ShoppingCart(x.items)));
  }

  async addTo(product: ProductId) {
    this.updateItem(product, 1);
  }

  async removeFrom(product: ProductId) {
    this.updateItem(product, -1);
  }

  async clear() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId) as AngularFireObject<ShoppingCartItem>;
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: ProductId, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.id);

    item$.valueChanges().pipe(take(1)).subscribe(item => {
      const quantity = ((item) ? item.quantity : 0) + change;
      if (quantity === 0) {
        item$.remove();
      } else {
        item$.update({
          // product,
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity
        });
      }
    });
  }
}
