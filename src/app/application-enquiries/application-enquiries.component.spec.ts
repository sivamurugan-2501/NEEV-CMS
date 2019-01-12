import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationEnquiriesComponent } from './application-enquiries.component';

describe('ApplicationEnquiriesComponent', () => {
  let component: ApplicationEnquiriesComponent;
  let fixture: ComponentFixture<ApplicationEnquiriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationEnquiriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationEnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
