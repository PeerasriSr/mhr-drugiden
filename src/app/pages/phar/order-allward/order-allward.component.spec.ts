import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAllwardComponent } from './order-allward.component';

describe('OrderAllwardComponent', () => {
  let component: OrderAllwardComponent;
  let fixture: ComponentFixture<OrderAllwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAllwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAllwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
