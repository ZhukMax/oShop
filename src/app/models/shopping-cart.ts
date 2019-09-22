import { ProductId } from './product';

export class ShoppingCartItem {
  constructor(public product: ProductId, public quantity: number) {}

  get totalPrice() {
    return this.product.price * this.quantity;
  }
}

export class ShoppingCart {
  dateCreated: number;
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: ShoppingCartItem[]) {
    for (const productId in itemsMap) {
      if (this.itemsMap.hasOwnProperty(productId)) {
        const item = this.itemsMap[productId];
        this.items.push(new ShoppingCartItem(item.product, item.quantity));
      }
    }
  }

  getQuantity(product: ProductId) {
    const item = this.itemsMap[product.id] as ShoppingCartItem;
    return item ? item.quantity : 0;
  }

  get totalItemsCount(): number {
    let count = 0;

    // tslint:disable-next-line: forin
    for (const productId in this.items) {
        if (this.items.hasOwnProperty(productId)) {
            count += this.items[productId].quantity;
        }
    }
    return count;
  }

  get totalPrice() {
    let sum = 0;
    for (const productId in this.items) {
      if (this.items.hasOwnProperty(productId)) {
        sum += this.items[productId].totalPrice;
      }
    }

    return sum;
  }
}
