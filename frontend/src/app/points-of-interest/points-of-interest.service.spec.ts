import { TestBed } from '@angular/core/testing';

import { PointsOfInterestService } from './points-of-interest.service';

describe('PointsOfInterestService', () => {
  let service: PointsOfInterestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointsOfInterestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
