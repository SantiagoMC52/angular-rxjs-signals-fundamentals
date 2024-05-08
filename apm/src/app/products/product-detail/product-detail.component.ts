import { Component, Input, computed } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe, AsyncPipe } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { EMPTY, catchError } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, AsyncPipe],
})
export class ProductDetailComponent {
  @Input() productId: number = 0;

  constructor(
    private productsService: ProductService,
    private cartService: CartService,
  ) {}

  // Product to display
  product = this.productsService.product;
  errorMessage = this.productsService.productError;

  // Set the page title
  pageTitle = computed(() =>
    this.product()
      ? `Product Detail for: ${this.product()?.productName}`
      : 'Product Detail',
  );

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
