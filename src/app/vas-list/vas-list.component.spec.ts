import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasListComponent } from './vas-list.component';

describe('VasListComponent', () => {
  let component: VasListComponent;
  let fixture: ComponentFixture<VasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
