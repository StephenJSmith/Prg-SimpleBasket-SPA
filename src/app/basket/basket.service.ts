import { Injectable } from '@angular/core';
import { IOrderItem } from './order-item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = 'http://localhost:/5000/api/baskets';

  constructor(private http: HttpClient) { }

  submitBasket(orderItems: IOrderItem[]): Observable<any> {
    return this.http.post<any>(this.baseUrl, orderItems);
  }
}
