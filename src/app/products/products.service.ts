import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IProduct } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = 'http://localhost:/5000/api/products';

  productsInBasket: IProduct[] = [];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    const url = this.baseUrl;

    return this.http.get<IProduct[]>(url)
    .pipe(
      catchError(() => {
        const msg = `Populating products list with hardcoded list
        due to unresolved CORS issue with Asp.NET Core 3 on my PC`;
        console.log(msg);
        return this.getHardcodedProducts();
      })
    );
  }

  getHardcodedProducts(): Observable<IProduct[]> {
    return of(this.hardcodeProducts());
  }

  setProductsInBasket(products: IProduct[]) {
    this.productsInBasket = products;
  }

  getProductsInBasket(): IProduct[] {
    return this.productsInBasket;
  }

  getCalculatedFreight(subtotalAmount: number): Observable<number> {
    const url = `${this.baseUrl}/freight/${subtotalAmount}`;

    return this.http.get<number>(url)
      .pipe(
        catchError(() => {
          const msg = `Calculating freight on client
          due to unresolved CORS issue with Asp.NET Core 3 on my PC`;
          console.log(msg);
          return this.getLocallyCalculatedFreight(subtotalAmount);
          })
      );
  }

  getLocallyCalculatedFreight(subtotalAmount: number): Observable<number> {
    let freight = 0;
    if (subtotalAmount > 0 && subtotalAmount <= 50) {
      freight = 10;
    }

    if (subtotalAmount > 50) {
      freight = 20;
    }

    return of(freight);
  }

  private hardcodeProducts(): IProduct[] {
    const products: IProduct[] = [
      { id: 1, name: 'Football', unitPrice: 25, quantity: 0 },
      { id: 2, name: 'Surfboard', unitPrice: 179, quantity: 0 },
      { id: 3, name: 'Running shoes', unitPrice: 95, quantity: 0 },
      { id: 4, name: 'Kayak', unitPrice: 275, quantity: 0 },
      { id: 5, name: 'Chess board', unitPrice: 19, quantity: 0 },
    ];

    return products;
  }
}
