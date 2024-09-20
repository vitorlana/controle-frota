import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataVehicleComponent } from './table-data-vehicle.component';

describe('TableDataVehicleComponent', () => {
  let component: TableDataVehicleComponent;
  let fixture: ComponentFixture<TableDataVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDataVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDataVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
