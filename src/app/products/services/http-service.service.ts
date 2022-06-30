import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { User } from 'src/app/models/user';

const API_URL = 'https://localhost:7222/Product';

@Injectable({
  providedIn: 'root'
})
export class HttpProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL);
  }
  createProduct(Product: Product): Observable<boolean> {
    return this.http.post<boolean>(API_URL, Product);
  }

  updateProduct(product: Product): Observable<boolean> {
    return this.http.put<boolean>(`${API_URL}/${product.id}`, product);
  }

  deleteProduct(productId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${API_URL}/${productId}`);
  }

  requestLambdaStatistics(products: string): Observable<any[]> {
    return this.http.post<any[]>('https://36setphgz32tl6nwhbuualikzy0jdumm.lambda-url.us-east-1.on.aws/', products);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL);
  }
}
