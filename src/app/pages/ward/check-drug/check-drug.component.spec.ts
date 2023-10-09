import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDrugComponent } from './check-drug.component';

describe('CheckDrugComponent', () => {
  let component: CheckDrugComponent;
  let fixture: ComponentFixture<CheckDrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckDrugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
