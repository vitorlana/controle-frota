import { TestBed } from '@angular/core/testing';

import { PointOfInterestService } from './points-of-interest.service';

describe('PointsOfInterestService', () => {
  let service: PointOfInterestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointOfInterestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
