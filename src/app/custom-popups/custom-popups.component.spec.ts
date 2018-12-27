import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPopupsComponent } from './custom-popups.component';

describe('CustomPopupsComponent', () => {
  let component: CustomPopupsComponent;
  let fixture: ComponentFixture<CustomPopupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPopupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPopupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
