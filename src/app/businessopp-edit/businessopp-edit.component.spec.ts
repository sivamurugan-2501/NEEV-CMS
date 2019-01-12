import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessoppEditComponent } from './businessopp-edit.component';

describe('BusinessoppEditComponent', () => {
  let component: BusinessoppEditComponent;
  let fixture: ComponentFixture<BusinessoppEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessoppEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessoppEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
