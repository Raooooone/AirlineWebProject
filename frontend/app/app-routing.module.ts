import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginSignupComponent } from './user-login-signup/user-login-signup.component';
import { AirlineManagementComponent } from './airline-management/airline-management.component';
import { FlightManagementComponent } from './flight-management/flight-management.component';
import { PassengerManagementComponent } from './passenger-management/passenger-management.component';
import { FeedbackManagementComponent } from './feedback-management/feedback-management.component';
import { ProfileComponent } from './profile/profile.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminAcceuilComponent } from './admin-acceuil/admin-acceuil.component';
import { UserAcceuilComponent } from './user-acceuil/user-acceuil.component';
import { ReservationFormulaireComponent } from './reservation-formulaire/reservation-formulaire.component';


export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: UserLoginSignupComponent},
  { path: 'userAcceuil', component:  UserAcceuilComponent },
  { path: 'formulaire', component: ReservationFormulaireComponent }, 
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'adminAcceuil', component: AdminAcceuilComponent },
  { path: 'airline-management', component: AirlineManagementComponent },
  { path: 'flight-management', component: FlightManagementComponent },
  { path: 'passenger-management', component: PassengerManagementComponent },
  { path: 'feedback-management', component: FeedbackManagementComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'add-member', component: AddMemberComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },



];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}