import { Component, OnDestroy, OnInit } from '@angular/core';

import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { EMPTY, catchError, tap } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent, AsyncPipe],
})
export class ProductListComponent {
  pageTitle = 'Products';
  errorMessage = '';

  // Products
  products = this.productsService.products;

  // Selected product id to highlight the entry
  readonly selectedProductId$ = this.productsService.productSelected$;

  constructor(private productsService: ProductService) {}

  onSelected(productId: number): void {
    this.productsService.productSelected(productId);
  }
}
