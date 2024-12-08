import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerManagementComponent } from './passenger-management.component';

describe('PassengerManagementComponent', () => {
  let component: PassengerManagementComponent;
  let fixture: ComponentFixture<PassengerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassengerManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
