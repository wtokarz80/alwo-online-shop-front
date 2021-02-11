import { TestBed } from '@angular/core/testing';

import { LocalBasketService } from './local-basket.service';

describe('LocalBasketService', () => {
  let service: LocalBasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalBasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
