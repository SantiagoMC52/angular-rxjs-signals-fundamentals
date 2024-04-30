import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Product } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductData } from './product-data';
import { HttpErrorService } from '../utilities/http-error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';

  constructor(
    private http: HttpClient,
    private errorService: HttpErrorService,
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.productsUrl)
      .pipe(catchError((err) => this.handleError(err)));
  }

  getProduct(id: number): Observable<Product> {
    return this.http
      .get<Product>(`${this.productsUrl}/${id}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMessage = this.errorService.formatError(err);
    throw formattedMessage;
  }
}
