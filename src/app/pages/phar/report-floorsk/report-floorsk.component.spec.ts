import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFloorskComponent } from './report-floorsk.component';

describe('ReportFloorskComponent', () => {
  let component: ReportFloorskComponent;
  let fixture: ComponentFixture<ReportFloorskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportFloorskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFloorskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
