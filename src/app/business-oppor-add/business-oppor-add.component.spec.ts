import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOpporAddComponent } from './business-oppor-add.component';

describe('BusinessOpporAddComponent', () => {
  let component: BusinessOpporAddComponent;
  let fixture: ComponentFixture<BusinessOpporAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessOpporAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessOpporAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
