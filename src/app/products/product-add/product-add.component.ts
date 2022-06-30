import { SignalrService } from 'src/app/signalr-services/signalr-service.service';
import { Router } from '@angular/router';
import { HttpProductService } from './../services/http-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  users: User[];
  formGroup: FormGroup;

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
  get createdBy() {
    return this.formGroup.get('createdBy');
  }

  constructor(private fb: FormBuilder,
    private httpService: HttpProductService,
    private router: Router,
    private signalRService: SignalrService) {
    this.signalRService.listenCreatedProduct();
  }

  ngOnInit() {
    this.httpService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      this.createForm();
    });
  }

  createForm() {
    this.formGroup = this.fb.group({
      name: [''],
      brand: [''],
      description: [''],
      price: [''],
      createdOn: [''],
      createdBy: [null]
    });
  }

  submit() {
    let createdProduct: Product = {
      id: 0,
      name: this.name?.value,
      brand: this.brand?.value,
      description: this.description?.value,
      price: this.price?.value,
      createdOn: this.createdOn?.value,
      createdByUserId: this.createdBy?.value,
    }
    this.httpService.createProduct(createdProduct).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
