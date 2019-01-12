import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasAddComponent } from './vas-add.component';

describe('VasAddComponent', () => {
  let component: VasAddComponent;
  let fixture: ComponentFixture<VasAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
