import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService } from './products.service';
import { IProduct } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  subOrderTotal = 0;

  constructor(
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.populateProductsList();
  }

  private populateProductsList() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      }, err => {
        console.log(err);
      });
  }

  onAddProductToBacket(product: IProduct) {
    product.quantity++;
    this.recalculateSubOrderTotal();
  }

  onRemoveProductFromBacket(product: IProduct) {
    if (product.quantity <= 0) { return; }

    product.quantity--;
    this.recalculateSubOrderTotal();
  }

  onGoToBasket() {
    if (this.subOrderTotal <= 0) { return; }

    this.productService.setProductsInBasket(this.products.filter(p => p.quantity > 0));
    this.router.navigateByUrl('checkout');
  }

  private recalculateSubOrderTotal() {
    this.subOrderTotal = this.products.reduce((a, b) =>
    a + (b.quantity * b.unitPrice), 0);
  }
}
