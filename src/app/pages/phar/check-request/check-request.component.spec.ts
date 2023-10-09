import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRequestComponent } from './CheckRequestComponent';

describe('CheckRequestComponent', () => {
  let component: CheckRequestComponent;
  let fixture: ComponentFixture<CheckRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
