import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDispensComponent } from './report-dispens.component';

describe('ReportDispensComponent', () => {
  let component: ReportDispensComponent;
  let fixture: ComponentFixture<ReportDispensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDispensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDispensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
