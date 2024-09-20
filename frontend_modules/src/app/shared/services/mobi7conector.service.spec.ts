import { TestBed } from '@angular/core/testing';

import { Mobi7connectorService } from './mobi7connector.service';

describe('Mobi7conectorService', () => {
  let service: Mobi7connectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mobi7connectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
