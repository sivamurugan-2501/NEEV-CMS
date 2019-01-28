import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductClonerComponent } from './product-cloner.component';

describe('ProductClonerComponent', () => {
  let component: ProductClonerComponent;
  let fixture: ComponentFixture<ProductClonerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductClonerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductClonerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
