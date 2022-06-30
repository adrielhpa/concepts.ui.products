import { SignalrService } from 'src/app/signalr-services/signalr-service.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, take, tap, filter, takeWhile } from 'rxjs';
import { HttpProductService } from '../services/http-service.service';
import { loadProducts, selectProductId } from '../state/products.action';
import { selectAllProducts } from '../state/products.selectors';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  statistics: any;
  private alive = true;

  constructor(private httpService: HttpProductService, private router: Router, private store: Store) { }

  ngOnInit() {
    this.products$ = this.store.select(selectAllProducts);
    this.products$.pipe(take(1), filter(product => product.length === 0)).subscribe(() => { this.getAllproducts() });
    this.products$.pipe(takeWhile(() => this.alive)).subscribe(products => this.getStatistics(products));
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  getStatistics(products: Product[]) {
    this.httpService.requestLambdaStatistics(JSON.stringify(products)).subscribe((res) => {
      this.statistics = res;
    });
  }

  getAllproducts() {
    this.httpService.getAllProducts().subscribe((products: Product[]) => this.store.dispatch(loadProducts({ products })));
  }

  goToDetail(productId: number) {
    this.store.dispatch(selectProductId({ productId }));
    this.router.navigate(['products', productId]);
  }
}
