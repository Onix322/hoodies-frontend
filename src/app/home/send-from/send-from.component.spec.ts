import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendFromComponent } from './send-from.component';

describe('SendFromComponent', () => {
  let component: SendFromComponent;
  let fixture: ComponentFixture<SendFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
