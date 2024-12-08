import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFormulaireComponent } from './reservation-formulaire.component';

describe('ReservationFormulaireComponent', () => {
  let component: ReservationFormulaireComponent;
  let fixture: ComponentFixture<ReservationFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationFormulaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
