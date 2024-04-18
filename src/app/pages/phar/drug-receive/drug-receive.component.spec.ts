import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugReceiveComponent } from './drug-receive.component';

describe('DrugReceiveComponent', () => {
  let component: DrugReceiveComponent;
  let fixture: ComponentFixture<DrugReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugReceiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
