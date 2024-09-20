import { TestBed } from '@angular/core/testing';

import { VehiclePostionService } from './vehicle-postion.service';

describe('VehiclePostionService', () => {
  let service: VehiclePostionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclePostionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
