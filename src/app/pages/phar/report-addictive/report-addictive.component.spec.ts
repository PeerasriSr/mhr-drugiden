import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAddictiveComponent } from './report-addictive.component';

describe('ReportAddictiveComponent', () => {
  let component: ReportAddictiveComponent;
  let fixture: ComponentFixture<ReportAddictiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAddictiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAddictiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
