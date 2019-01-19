import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserLoginComponent } from './other-user-login.component';

describe('OtherUserLoginComponent', () => {
  let component: OtherUserLoginComponent;
  let fixture: ComponentFixture<OtherUserLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherUserLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
