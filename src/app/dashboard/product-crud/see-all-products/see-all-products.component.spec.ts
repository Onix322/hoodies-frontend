import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllProductsComponent } from './see-all-products.component';

describe('SeeAllProductsComponent', () => {
  let component: SeeAllProductsComponent;
  let fixture: ComponentFixture<SeeAllProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeAllProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeAllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
