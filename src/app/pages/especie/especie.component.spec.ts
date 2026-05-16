import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecieComponent } from './especie.component';

describe('EspecieComponent', () => {
  let component: EspecieComponent;
  let fixture: ComponentFixture<EspecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
