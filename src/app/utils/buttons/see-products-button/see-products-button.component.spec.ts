import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeProductsButtonComponent } from './see-products-button.component';

describe('SeeProductsButtonComponent', () => {
  let component: SeeProductsButtonComponent;
  let fixture: ComponentFixture<SeeProductsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeProductsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeProductsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
