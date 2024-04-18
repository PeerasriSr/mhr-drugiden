import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeddispenComponent } from './meddispen.component';

describe('MeddispenComponent', () => {
  let component: MeddispenComponent;
  let fixture: ComponentFixture<MeddispenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeddispenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeddispenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
