import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerAddComponent } from './dealer-add.component';

describe('DealerAddComponent', () => {
  let component: DealerAddComponent;
  let fixture: ComponentFixture<DealerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
