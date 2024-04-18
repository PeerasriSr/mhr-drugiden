import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDispenComponent } from './report-dispen.component';

describe('ReportDispenComponent', () => {
  let component: ReportDispenComponent;
  let fixture: ComponentFixture<ReportDispenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDispenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDispenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
