import { async, ComponentFixture, TestBed } from '@angular/core/testing';



describe('MultipurposePopupComponent', () => {
  let component: MultipurposePopupComponent;
  let fixture: ComponentFixture<MultipurposePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipurposePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipurposePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
