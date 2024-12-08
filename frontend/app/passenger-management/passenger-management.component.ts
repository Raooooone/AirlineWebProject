import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../passenger.service';
import { Passenger } from '../interface/passenger';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-passenger-management',
  templateUrl: './passenger-management.component.html',
  styleUrls: ['./passenger-management.component.css']
})
export class PassengerManagementComponent implements OnInit {
  passengers: Passenger[] = [];
  filteredPassengers: Passenger[] = [];
  searchTerm: string = '';

  constructor(private passengerService: PassengerService) {}

  ngOnInit(): void {
    this.loadPassengers();
  }

  // Load all passengers
  loadPassengers(): void {
    this.passengerService.getPassengers().subscribe(
      (data) => {
        this.passengers = data;
        this.filteredPassengers = data; // Initialize filtered passengers
      },
      (error) => {
        console.error('Failed to load passengers:', error);
      }
    );
  }

  // Filter passengers based on search term
  searchPassengers(): void {
    if (!this.searchTerm) {
      this.filteredPassengers = this.passengers;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredPassengers = this.passengers.filter((passenger) =>
        passenger.pid.toLowerCase().includes(term) ||
        passenger.fullName.toLowerCase().includes(term)
      );
    }
  }

  // Export filtered passengers to PDF
  exportToPDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Passenger List', 14, 20);

    const rows = this.filteredPassengers.map(passenger => [
      passenger.pid,
      passenger.fullName,
      passenger.passport,
      passenger.mobileNumber,
      passenger.dob,
      passenger.gender,
      `${passenger.flightNumber}: ${passenger.from} → ${passenger.to}`,
      passenger.seatClass,  // New field: Seat Class
      passenger.flightDate, // New field: Flight Date
      passenger.flightTime  // New field: Flight Time
    ]);

    doc.autoTable({
      head: [
        ['PID', 'Full Name', 'Passport', 'Mobile', 'DOB', 'Gender', 'Flight Booking', 'Seat Class', 'Flight Date', 'Flight Time']
      ],
      body: rows,
      startY: 30
    });

    doc.save('passenger-list.pdf');
  }
}
