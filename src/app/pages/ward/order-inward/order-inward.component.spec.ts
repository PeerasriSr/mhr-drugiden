import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInwardComponent } from './order-inward.component';

describe('OrderInwardComponent', () => {
  let component: OrderInwardComponent;
  let fixture: ComponentFixture<OrderInwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderInwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
