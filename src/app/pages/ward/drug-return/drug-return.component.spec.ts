import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugReturnComponent } from './drug-return.component';

describe('DrugReturnComponent', () => {
  let component: DrugReturnComponent;
  let fixture: ComponentFixture<DrugReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
