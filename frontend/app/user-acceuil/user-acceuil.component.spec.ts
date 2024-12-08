import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcceuilComponent } from './user-acceuil.component';

describe('UserAcceuilComponent', () => {
  let component: UserAcceuilComponent;
  let fixture: ComponentFixture<UserAcceuilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAcceuilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAcceuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
