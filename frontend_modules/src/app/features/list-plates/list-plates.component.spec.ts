import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlatesComponent } from './list-plates.component';

describe('ListPlatesComponent', () => {
  let component: ListPlatesComponent;
  let fixture: ComponentFixture<ListPlatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPlatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
