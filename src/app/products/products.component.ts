import { SignalrService } from 'src/app/signalr-services/signalr-service.service';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom, filter, take } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private signalRService: SignalrService) {}

  async ngOnInit(): Promise<void> {
    const promise = firstValueFrom(this.signalRService.started.pipe(filter(x => x), take(1)));
    await promise;
    this.signalRService.exitGroup('Users');
    this.signalRService.joinGroup('Products');
  }
}
