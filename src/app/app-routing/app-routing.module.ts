import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products/products.component';
import { BasketComponent } from '../basket/basket.component';
import { ThankYouComponent } from '../thank-you/thank-you.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products',  component: ProductsComponent },
  { path: 'checkout', component: BasketComponent },
  { path: 'thank-you', component: ThankYouComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
