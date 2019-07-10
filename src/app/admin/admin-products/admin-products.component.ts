import { ProductId } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: ProductId[];
  filteredProducts: ProductId[];
  subscribtion: Subscription;
  columns = [
    { prop: 'Title' },
    { name: 'Price' },
    { name: '' }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.subscribtion = this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products);
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }
}
