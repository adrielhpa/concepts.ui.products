import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ResponseData } from '../models/response';
import { BehaviorSubject, Observable } from 'rxjs';
import { createProduct, deleteProduct, updateProduct } from '../products/state/products.action';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: HubConnection;
  private started$ = new BehaviorSubject<boolean>(false);

  get started(): Observable<boolean> {
    return this.started$ as Observable<boolean>;
  }

  constructor(private store: Store, private toastrService: ToastrService) {
    let builder = new HubConnectionBuilder();
    this.hubConnection = builder.withUrl('https://localhost:7293/messagesHub').build();
    this.hubConnection.start().then(() => this.started$.next(true)).catch(error => console.log(error));
  }

  joinGroup(groupName: string) {
    this.hubConnection.invoke('JoinGroup', groupName);
  }

  exitGroup(groupName: string) {
    this.hubConnection.invoke('ExitGroup', groupName);
  }

  listenCreatedProduct() {
    this.hubConnection.on('CreatedProduct', (msg: ResponseData) => {
      if (msg.isValid) {
        this.store.dispatch(createProduct({product: msg.productData}));
        this.toastrService.success(msg.message, 'Success');
      }
      else {
        this.toastrService.error(msg.message, 'Error');
      }
    });
  }
  listenUpdatedProduct() {
    this.hubConnection.on('UpdatedProduct', (msg: ResponseData) => {
      if (msg.isValid) {
        this.store.dispatch(updateProduct({product: msg.productData}));
        this.toastrService.success(msg.message, 'Success');
      }
      else {
        this.toastrService.error(msg.message, 'Error');
      }
    });
  }
  listenDeletedProduct() {
    this.hubConnection.on('DeletedProduct', (msg: ResponseData) => {
      if (msg.isValid) {
        this.store.dispatch(deleteProduct({ productId: msg.productData.id }));
        this.toastrService.success(msg.message, 'Success');
      }
      else {
        this.toastrService.error(msg.message, 'Error');
      }
    });
  }
}
