import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasEditComponent } from './vas-edit.component';

describe('VasEditComponent', () => {
  let component: VasEditComponent;
  let fixture: ComponentFixture<VasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
