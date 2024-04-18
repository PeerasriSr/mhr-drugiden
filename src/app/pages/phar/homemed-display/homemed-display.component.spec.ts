import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemedDisplayComponent } from './homemed-display.component';

describe('HomemedDisplayComponent', () => {
  let component: HomemedDisplayComponent;
  let fixture: ComponentFixture<HomemedDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomemedDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomemedDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
