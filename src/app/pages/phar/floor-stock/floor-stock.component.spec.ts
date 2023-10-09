import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorStockComponent } from './floor-stock.component';

describe('FloorStockComponent', () => {
  let component: FloorStockComponent;
  let fixture: ComponentFixture<FloorStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloorStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
