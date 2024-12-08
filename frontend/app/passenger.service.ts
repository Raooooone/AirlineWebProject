import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Passenger } from './interface/passenger';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  // Mock passenger data with updated properties: flightDate and flightTime
  private passengers: Passenger[] = [
    {
      pid: 'P001',
      fullName: 'John Doe',
      passport: 'A1234567',
      mobileNumber: '123-456-7890',
      dob: '1990-01-01',
      gender: 'Male',
      flightNumber: 'AA101',
      seatClass: 'Economy',
      from: 'New York',
      to: 'Los Angeles',
      bookingts: '2023-12-01T12:00:00Z', // Updated booking timestamp format
      flightDate: '2024-01-10',          // Added flight date
      flightTime: '10:00 AM'             // Added flight time
    },
    {
      pid: 'P002',
      fullName: 'Jane Smith',
      passport: 'B2345678',
      mobileNumber: '987-654-3210',
      dob: '1985-02-02',
      gender: 'Female',
      flightNumber: 'BA202',
      seatClass: 'Business',
      from: 'London',
      to: 'Paris',
      bookingts: '2023-12-02T14:30:00Z', // Updated booking timestamp format
      flightDate: '2024-01-15',          // Added flight date
      flightTime: '2:00 PM'              // Added flight time
    }
    // Add more mock passengers if needed
  ];

  constructor() {}

  // Get all passengers (no API call, just return mock data)
  getPassengers(): Observable<Passenger[]> {
    return of(this.passengers);
  }

  // Add a new passenger (booking)
  addPassenger(passenger: Passenger): Observable<Passenger> {
    this.passengers.push(passenger); // Add to the mock array
    return of(passenger); // Return the newly added passenger
  }

  // Filter passengers by search term (PID or full name)
  filterPassengers(searchTerm: string): Observable<Passenger[]> {
    const filteredPassengers = this.passengers.filter(
      (passenger) =>
        passenger.pid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        passenger.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filteredPassengers);
  }

  // Export passengers to PDF
  exportPassengersToPDF(passengers: Passenger[]): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Passenger List", 14, 20);

    const rows = passengers.map(passenger => [
      passenger.pid,
      passenger.fullName,
      passenger.passport,
      passenger.mobileNumber,
      passenger.dob,
      passenger.gender,
      `${passenger.flightNumber} : ${passenger.from} → ${passenger.to}`,
      passenger.flightDate,   // Added flight date column
      passenger.flightTime    // Added flight time column
    ]);

    doc.autoTable({
      head: [['PID', 'Full Name', 'Passport', 'Mobile Number', 'DOB', 'Gender', 'Flight Booking', 'Flight Date', 'Flight Time']],
      body: rows,
      startY: 30,
    });

    doc.save('passenger-list.pdf');
  }
}
