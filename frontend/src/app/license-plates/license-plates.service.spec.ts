import { TestBed } from '@angular/core/testing';

import { LicensePlatesService } from './license-plates.service';

describe('LicensePlatesService', () => {
  let service: LicensePlatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicensePlatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
