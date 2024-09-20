import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPositionsComponent } from './map-positions.component';

describe('MapPositionsComponent', () => {
  let component: MapPositionsComponent;
  let fixture: ComponentFixture<MapPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapPositionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
