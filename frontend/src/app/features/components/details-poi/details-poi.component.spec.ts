import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPoiComponent } from './details-poi.component';

describe('DetailsPoiComponent', () => {
  let component: DetailsPoiComponent;
  let fixture: ComponentFixture<DetailsPoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPoiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
