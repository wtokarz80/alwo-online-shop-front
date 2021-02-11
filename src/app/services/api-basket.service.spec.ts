import { TestBed } from '@angular/core/testing';

import { ApiBasketService } from './api-basket.service';

describe('ApiBasketService', () => {
  let service: ApiBasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
