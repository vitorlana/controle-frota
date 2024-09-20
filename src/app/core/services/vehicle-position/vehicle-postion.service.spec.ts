import { TestBed } from '@angular/core/testing';

import { VehiclePositionService } from './vehicle-position.service';

describe('VehiclePostionService', () => {
  let service: VehiclePositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclePositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
