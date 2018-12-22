import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgmAddComponent } from './tgm-add.component';

describe('TgmAddComponent', () => {
  let component: TgmAddComponent;
  let fixture: ComponentFixture<TgmAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgmAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
