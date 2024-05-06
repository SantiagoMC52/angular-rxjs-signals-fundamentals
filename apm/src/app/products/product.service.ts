import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { Product } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';

  constructor(
    private http: HttpClient,
    private errorService: HttpErrorService,
    private reviewService: ReviewService,
  ) {}

  readonly products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    tap(() => console.log('In hhtp.get by id pipeline')),
    catchError((err) => this.handleError(err)),
  );

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`).pipe(
      switchMap((product) => this.getProductWithReviews(product)),
      tap((x) => console.log('x->', x)),
      catchError((err) => this.handleError(err)),
    );
  }

  private getProductWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http
        .get<Review[]>(this.reviewService.getReviewUrl(product.id))
        .pipe(map((reviews) => ({ ...product, reviews }) as Product));
    } else {
      return of(product);
    }
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMessage = this.errorService.formatError(err);
    throw formattedMessage;
  }
}
