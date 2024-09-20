import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPointsOfInterestComponent } from './list-points-of-interest.component';

describe('ListPointsOfInterestComponent', () => {
  let component: ListPointsOfInterestComponent;
  let fixture: ComponentFixture<ListPointsOfInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPointsOfInterestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPointsOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
