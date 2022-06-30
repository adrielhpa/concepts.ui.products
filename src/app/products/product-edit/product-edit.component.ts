import { SignalrService } from 'src/app/signalr-services/signalr-service.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { selectCurrentProduct } from '../state/products.selectors';
import { HttpProductService } from '../services/http-service.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  formGroup: FormGroup;
  product: Product;

  get name() {
    return this.formGroup.get('name');
  }
  get brand() {
    return this.formGroup.get('brand');
  }
  get description() {
    return this.formGroup.get('description');
  }
  get price() {
    return this.formGroup.get('price');
  }
  get createdOn() {
    return this.formGroup.get('createdOn');
  }

  constructor(private store: Store, private fb: FormBuilder,
    private httpService: HttpProductService,
    private router: Router,
    private signalRService: SignalrService) {
    this.signalRService.listenUpdatedProduct();
  }

  ngOnInit() {
    this.store.select(selectCurrentProduct).subscribe((product: Product) => {
      this.product = product;
      this.createForm(product);
    });
  }

  createForm(product: Product) {
    this.formGroup = this.fb.group({
      name: [product.name],
      brand: [product.brand],
      description: [product.description],
      price: [product.price],
      createdOn: [product.createdOn],
    });
  }

  submit() {
    let updatedProduct: Product = {
      id: this.product?.id,
      name: this.name?.value,
      brand: this.brand?.value,
      description: this.description?.value,
      price: this.price?.value,
      createdOn: this.createdOn?.value,
      createdByUserId: this.product?.createdByUserId,
    }
    this.httpService.updateProduct(updatedProduct).subscribe((user) => {
      this.router.navigate(['/products']);
    });
  }
}
