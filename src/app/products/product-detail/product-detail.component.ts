import { HttpProductService } from './../services/http-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentProduct } from '../state/products.selectors';
import { Product } from '../../models/Product';
import { SignalrService } from 'src/app/signalr-services/signalr-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  formGroup: FormGroup;

  constructor(private store: Store, private fb: FormBuilder,
    private router: Router,
    private httpService: HttpProductService,
    private signalRService: SignalrService
  ) {
    this.signalRService.listenDeletedProduct();
  }

  ngOnInit() {
    this.store.select(selectCurrentProduct).subscribe((product: Product) => {
      this.product = product;
      this.createForm(product);
    });
  }

  createForm(product: Product) {
    this.formGroup = this.fb.group({
      name: [{ value: product.name, disabled: true }],
      brand: [{ value: product.brand, disabled: true }],
      price: [{ value: product.price, disabled: true }],
      description: [{ value: product.description, disabled: true }],
      createdOn: [{ value: product.createdOn, disabled: true }],
      productCreatorName: [{ value: product.createdByUser.name, disabled: true }],
      productCreatorAge: [{ value: product.createdByUser.age, disabled: true }],
      productCreatorAdress: [{ value: product.createdByUser.adress, disabled: true }],
      productCreatorCity: [{ value: product.createdByUser.city, disabled: true }],
      productCreatorUsername: [{ value: product.createdByUser.username, disabled: true }],
    });
  }

  deleteProduct(productId: number) {
    this.httpService.deleteProduct(productId).subscribe(() => {
      this.router.navigate(['/products']);
    })
  }

}
