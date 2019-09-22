import { ShoppingCartItem, ShoppingCart } from './models/shopping-cart';
import { ProductId } from './models/product';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async get(): Promise<Observable<ShoppingCart>> {
    const id = await this.getOrCreateCartId();
    return (this.db.object('/shopping-carts/' + id).valueChanges() as Observable<ShoppingCart>)
      .pipe(map(x => new ShoppingCart(x.items)));
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

  async addTo(product: ProductId) {
    this.updateItemQuantity(product, 1);
  }

  async removeFrom(product: ProductId) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: ProductId, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.id);

    item$.valueChanges().pipe(take(1)).subscribe(item => {
      const i = (item) ? item.quantity : 0;
      item$.update({ product, quantity: i + change });
    });
  }
}
