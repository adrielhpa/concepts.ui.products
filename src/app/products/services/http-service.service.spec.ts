/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpProductService } from './http-service.service';

describe('Service: HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpProductService]
    });
  });

  it('should ...', inject([HttpProductService], (service: HttpProductService) => {
    expect(service).toBeTruthy();
  }));
});
