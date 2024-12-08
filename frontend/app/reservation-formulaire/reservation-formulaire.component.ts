import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';  // Import the FlightService
import { PassengerService } from '../passenger.service'; // Import the PassengerService
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-formulaire',
  templateUrl: './reservation-formulaire.component.html',
  styleUrls: ['./reservation-formulaire.component.css'],
})
export class ReservationFormulaireComponent implements OnInit {
  ticketForm = {
    fullName: '',
    passport: '',
    mobileNumber: '',
    dob: '',
    gender: 'Male',
    seatClass: 'Economy',
    from: 'Tunisia',  // Default departure country
    to: '',
    pid: '',
    bookingts: new Date().toISOString(),
    price: 0,
    flightDate: '', // Flight Date
    flightTime: '', // Flight Time
    flightNumber: '', // Flight Number
  };

  availableTimes: string[] = [];  // Available flight times
  availableFlightDates: string[] = []; // Available flight dates
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private flightService: FlightService,
    private passengerService: PassengerService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to the flightDetails$ observable to get the selected flight data
    this.flightService.flightDetails$.subscribe((flightData) => {
      if (flightData) {
        this.ticketForm.flightDate = flightData. departureDate;
        this.ticketForm.flightTime = flightData.departureTime;
        this.ticketForm.from = flightData.departure;
        this.ticketForm.to = flightData.arrival;
        this.ticketForm.flightNumber = flightData.flightNumber;
      }
    });
  }

  // Method to update the price based on seat class and destination
  updatePrice(): void {
    if (this.ticketForm.to) {
      let basePrice = this.priceMatrix[this.ticketForm.to] || 0;
      const discount = this.seatClassDiscounts[this.ticketForm.seatClass] || 0;
      this.ticketForm.price = basePrice - basePrice * discount;
    } else {
      this.ticketForm.price = 0;
    }
  }

  // Method to submit the reservation and store passenger data in the table
  bookTicket(): void {
    if (
      this.ticketForm.fullName &&
      this.ticketForm.passport &&
      this.ticketForm.mobileNumber &&
      this.ticketForm.to &&
      this.ticketForm.flightDate &&
      this.ticketForm.flightTime
    ) {
      // Generate a unique PID for the passenger
      this.ticketForm.pid = this.generatePID();
      this.ticketForm.bookingts = new Date().toISOString(); // Current timestamp for booking

      // Prepare the passenger data including flight details
      const passengerData = {
        ...this.ticketForm,
        flightNumber: this.ticketForm.flightNumber, // Add flight number for reference
      };

      // Call the PassengerService to store the passenger data
      this.passengerService.addPassenger(passengerData).subscribe(
        (response) => {
          console.log('Booking successful:', response);
          this.successMessage = 'Ticket booked successfully!';
          setTimeout(() => {
            this.successMessage = 'Wish you a good flight!';
            setTimeout(() => this.router.navigate(['/userAcceuil']), 2000); // Redirect to user home after booking
          }, 2000);
        },
        (error) => {
          console.error('Booking failed:', error);
          this.errorMessage = 'Failed to book ticket. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }

  // Generate a unique Passenger ID
  private generatePID(): string {
    return 'PID-' + Math.floor(Math.random() * 1000000);
  }

  // Generate a unique Flight Number
  private generateFlightNumber(): string {
    return 'FN-' + Math.floor(Math.random() * 10000);
  }

  // Placeholder for pricing matrix (you can customize this)
  private priceMatrix: { [key: string]: number } = {
    'Tunisia': 100,  // Base price example
    // Add other destinations with their respective base prices
  };

  // Placeholder for seat class discounts (you can customize this)
  private seatClassDiscounts: { [key: string]: number } = {
    'Economy': 0.1,  // 10% discount for Economy class
    'Business': 0.2,  // 20% discount for Business class
    'First': 0.3,     // 30% discount for First class
  };
}
