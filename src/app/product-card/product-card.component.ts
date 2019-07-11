import { Component, Input } from '@angular/core';
import { ProductId } from '../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: ProductId;
// tslint:disable-next-line: no-input-rename
  @Input('show-actions') showActions = true;

  constructor() {}
}
