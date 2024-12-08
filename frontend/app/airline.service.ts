import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Airline } from './interface/airline';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  private airlines: Airline[] = [
    { id: 1, name: 'Airline A', numberOfFlights: 100, date: '2024-01-01', country: 'USA' },
    { id: 2, name: 'Airline B', numberOfFlights: 50, date: '2023-12-01', country: 'Canada' },
  ];

  getAllAirlines(): Observable<Airline[]> {
    return of(this.airlines);  // Simulates fetching the list of airlines
  }

  addAirline(airline: Airline): Observable<Airline> {
    airline.id = this.airlines.length + 1;  // Simulate ID assignment
    this.airlines.push(airline);
    return of(airline);  // Simulates adding a new airline
  }

  addFlight(airlineId: number): Observable<any> {
    const airline = this.airlines.find(a => a.id === airlineId);
    if (airline) {
      airline.numberOfFlights += 1;  // Simulate adding a flight
    }
    return of({ success: true });
  }

  removeFlight(airlineId: number): Observable<any> {
    const airline = this.airlines.find(a => a.id === airlineId);
    if (airline && airline.numberOfFlights > 0) {
      airline.numberOfFlights -= 1;  // Simulate removing a flight
    }
    return of({ success: true });
  }

  deleteAirline(airlineId: number): Observable<any> {
    this.airlines = this.airlines.filter(a => a.id !== airlineId);  // Simulate deletion
    return of({ success: true });
  }
}
