import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUplaodsComponent } from './user-uplaods.component';

describe('UserUplaodsComponent', () => {
  let component: UserUplaodsComponent;
  let fixture: ComponentFixture<UserUplaodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUplaodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUplaodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
