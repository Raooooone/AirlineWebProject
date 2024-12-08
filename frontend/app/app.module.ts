import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AirlineManagementComponent } from './airline-management/airline-management.component';
import { FlightManagementComponent } from './flight-management/flight-management.component';
import { PassengerManagementComponent } from './passenger-management/passenger-management.component';
import { FeedbackManagementComponent } from './feedback-management/feedback-management.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { UserLoginSignupComponent } from './user-login-signup/user-login-signup.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AdminAcceuilComponent } from './admin-acceuil/admin-acceuil.component';
import { UserAcceuilComponent } from './user-acceuil/user-acceuil.component';
import { ReservationFormulaireComponent } from './reservation-formulaire/reservation-formulaire.component';
import {  } from './user-acceuil/user-acceuil.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    AirlineManagementComponent,
    FlightManagementComponent,
    PassengerManagementComponent,
    FeedbackManagementComponent,
    AddMemberComponent,
    UserLoginSignupComponent,
    AdminLoginComponent,
    ProfileComponent,
    HomeComponent,
    AdminAcceuilComponent,
    UserAcceuilComponent,
    ReservationFormulaireComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
