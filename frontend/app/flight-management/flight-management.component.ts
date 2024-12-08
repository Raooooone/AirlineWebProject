import { Component, OnInit } from '@angular/core';
import { Flight } from '../interface/flight';  // Import the Flight interface
import { FlightService } from '../flight.service';  // Import the FlightService

@Component({
  selector: 'app-flight-management',
  templateUrl: './flight-management.component.html',
  styleUrls: ['./flight-management.component.css']
})
export class FlightManagementComponent implements OnInit {
  flights: Flight[] = [];  // List of flights
  currentFlight: Flight = {  // Holds the flight being added/edited
    flightNumber: '',
    departure: '',
    arrival: '',
    departureDate: '',
    departureTime: '',
    arrivalTime: ''
  };
  isEditing: boolean = false;  // Flag to toggle between adding and editing mode
  isFormVisible: boolean = false;  // Flag to toggle the form visibility

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.loadFlights();  // Load flights on component initialization
  }

  // Load all flights from the service
  loadFlights(): void {
    this.flightService.getFlights().subscribe(flights => {
      this.flights = flights;
    });
  }

  // Toggle the form visibility for adding/editing a flight
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.resetForm();  // Reset form when hidden
    }
  }

  // Reset the flight form
  resetForm(): void {
    this.currentFlight = {
      flightNumber: '',
      departure: '',
      arrival: '',
      departureDate: '',
      departureTime: '',
      arrivalTime: ''
    };
    this.isEditing = false;  // Reset editing mode
  }

  // Open the form for editing a flight
  editFlight(flight: Flight): void {
    this.isEditing = true;
    this.currentFlight = { ...flight };  // Copy the flight details into the form
    this.isFormVisible = true;  // Ensure the form is visible
  }

  // Submit the form to either add or update a flight
  onSubmit(): void {
    if (this.isEditing) {
      this.flightService.updateFlight(this.currentFlight).subscribe(updatedFlight => {
        if (updatedFlight) {
          this.loadFlights();  // Reload the flights after the update
        }
      });
    } else {
      this.flightService.addFlight(this.currentFlight).subscribe(newFlight => {
        this.loadFlights();  // Reload the flights after adding
      });
    }
    this.isEditing = false;  // Reset editing mode
    this.isFormVisible = false;  // Hide the form after submission
  }

  // Delete a flight
  deleteFlight(flight: Flight): void {
    this.flightService.deleteFlight(flight.flightNumber).subscribe(() => {
      this.loadFlights();  // Reload the flights after deletion
    });
  }
}
