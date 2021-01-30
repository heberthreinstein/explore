import { TestBed } from '@angular/core/testing';

import { CupomService } from './cupom.service';

describe('CupomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CupomService = TestBed.get(CupomService);
    expect(service).toBeTruthy();
  });
});
