import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOpporListComponent } from './business-oppor-list.component';

describe('BusinessOpporListComponent', () => {
  let component: BusinessOpporListComponent;
  let fixture: ComponentFixture<BusinessOpporListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessOpporListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessOpporListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
