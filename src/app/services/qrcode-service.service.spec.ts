import { TestBed } from '@angular/core/testing';

import { QrcodeServiceService } from './qrcode-service.service';

describe('QrcodeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrcodeServiceService = TestBed.get(QrcodeServiceService);
    expect(service).toBeTruthy();
  });
});
