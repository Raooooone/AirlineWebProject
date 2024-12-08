import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Flight } from './interface/flight';  // Import the Flight interface

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  // Mock flights data (you can replace this with actual API calls later)
  private flights: Flight[] = [
    {
      flightNumber: 'FN1001',
      departure: 'Tunisia',
      arrival: 'Paris',
      departureDate: '2024-12-12',
      departureTime: '08:00',
      arrivalTime: '12:00'
    },
    {
      flightNumber: 'FN1002',
      departure: 'Paris',
      arrival: 'New York',
      departureDate: '2024-12-15',
      departureTime: '14:00',
      arrivalTime: '18:00'
    }
  ];

  // Create a BehaviorSubject to hold the selected flight details
  private flightDetailsSubject = new BehaviorSubject<Flight | null>(null);
  flightDetails$ = this.flightDetailsSubject.asObservable();  // Expose as an observable

  constructor() {}

  // Get all flights (simulated without API)
  getFlights(): Observable<Flight[]> {
    return new Observable((observer) => {
      observer.next(this.flights);  // Emit the mock flight data
      observer.complete();
    });
  }

  // Set the selected flight details
  setFlightDetails(flight: Flight): void {
    this.flightDetailsSubject.next(flight);  // Update the flight details
  }

  // Add a new flight (simulated without API)
  addFlight(flight: Flight): Observable<Flight> {
    return new Observable((observer) => {
      this.flights.push(flight);  // Add the new flight to the mock data
      observer.next(flight);  // Emit the added flight
      observer.complete();
    });
  }

  // Update an existing flight (simulated without API)
  updateFlight(flight: Flight): Observable<Flight> {
    return new Observable((observer) => {
      const index = this.flights.findIndex(f => f.flightNumber === flight.flightNumber);
      if (index !== -1) {
        this.flights[index] = flight;  // Update the flight in the mock data
        observer.next(flight);  // Emit the updated flight
      } else {
        observer.error('Flight not found');
      }
      observer.complete();
    });
  }

  // Delete a flight (simulated without API)
  deleteFlight(flightNumber: string): Observable<void> {
    return new Observable((observer) => {
      const index = this.flights.findIndex(f => f.flightNumber === flightNumber);
      if (index !== -1) {
        this.flights.splice(index, 1);  // Remove the flight from the mock data
        observer.next();  // Emit a successful delete
      } else {
        observer.error('Flight not found');
      }
      observer.complete();
    });
  }
}
