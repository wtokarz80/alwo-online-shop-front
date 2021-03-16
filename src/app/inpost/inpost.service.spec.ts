import { TestBed } from '@angular/core/testing';

import { InpostService } from './inpost.service';

describe('InpostService', () => {
  let service: InpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
