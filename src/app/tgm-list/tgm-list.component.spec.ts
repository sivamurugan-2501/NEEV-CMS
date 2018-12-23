import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgmListComponent } from './tgm-list.component';

describe('TgmListComponent', () => {
  let component: TgmListComponent;
  let fixture: ComponentFixture<TgmListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgmListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
