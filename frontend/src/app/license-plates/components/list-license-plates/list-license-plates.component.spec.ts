import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLicensePlatesComponent } from './list-license-plates.component';

describe('ListLicensePlatesComponent', () => {
  let component: ListLicensePlatesComponent;
  let fixture: ComponentFixture<ListLicensePlatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLicensePlatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLicensePlatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
