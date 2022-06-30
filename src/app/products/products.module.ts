import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductAddComponent } from './product-add/product-add.component';
import { productReducer } from './state/products.reducer';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductAddComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature("products", productReducer),
    StoreDevtoolsModule.instrument({ maxAge: 29 }),
  ],
})
export class ProductsModule { }
