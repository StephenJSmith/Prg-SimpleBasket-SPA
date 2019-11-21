import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { IProduct } from '../products/product.model';
import { Router } from '@angular/router';
import { BasketService } from './basket.service';
import { IOrderItem } from './order-item.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  productsInBasket: IProduct[] = [];
  subtotalAmount = 0;
  freightAmount = 0;
  canRemoveProducts = true;
  canAddFreight = true;
  canCheckout = false;
  canNavigateToProducts = false;

  constructor(
    private productService: ProductsService,
    private basketService: BasketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.populateProductsInBasket();
    this.calculateSubtotalAmount();
  }

  private populateProductsInBasket() {
    this.productsInBasket = this.productService.getProductsInBasket();
  }

  private calculateSubtotalAmount() {
    this.subtotalAmount = this.productsInBasket.reduce((a, b) => a + (b.quantity * b.unitPrice), 0);
  }

  onAddFreight() {
    this.productService.getCalculatedFreight(this.subtotalAmount)
      .subscribe(freight => {
        this.freightAmount = freight;
        this.canAddFreight = false;
        this.canCheckout = true;
          }, err => {
        console.log(err);
      });
  }

  onRemoveProduct(product: IProduct) {
    this.productsInBasket = this.productsInBasket.filter(p => p.id !== product.id);
    this.calculateSubtotalAmount();
    this.resetFreight();
    this.canNavigateToProducts = this.productsInBasket.length === 0;
  }

  onNavigateToProducts() {
    if (!this.canNavigateToProducts) { return; }

    this.router.navigateByUrl('products');
  }

  onCheckout() {
    const orderItems: IOrderItem[] = this.getOrderItemsFromProducts();
    this.basketService.submitBasket(orderItems)
      .subscribe(() => {
        this.navigateToThankYouPage();
      }, err => {
        this.navigateToThankYouPage();
      });
  }

  private navigateToThankYouPage() {
    this.router.navigateByUrl('thank-you');
  }

  private getOrderItemsFromProducts() {
    const orderItems: IOrderItem[] = [];

    this.productsInBasket.forEach(p => {
      const orderItem: IOrderItem = { productId: p.id, quantity: p.quantity };
      orderItems.push(orderItem);
    });

    return orderItems;
  }

  private resetFreight() {
    this.freightAmount = 0;
    this.canAddFreight = this.productsInBasket.length > 0;
    this.canCheckout = false;
  }
}
