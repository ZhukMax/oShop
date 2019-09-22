import { Component, Input } from '@angular/core';
import { ProductId } from '../models/product';
import { ShoppingCart, ShoppingCartItem } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input() product: ProductId;
  // tslint:disable-next-line: no-input-rename
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addTo(this.product);
  }

  removeFrom() {
    this.cartService.removeFrom(this.product);
  }
}
