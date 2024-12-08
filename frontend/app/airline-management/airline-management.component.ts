import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../airline.service';  // Import your service
import { Airline } from '../interface/airline';  // Import the Airline interface

@Component({
  selector: 'app-airline-management',
  templateUrl: './airline-management.component.html',
  styleUrls: ['./airline-management.component.css']
})
export class AirlineManagementComponent implements OnInit {
  airlines: Airline[] = [];
  searchTerm: string = '';
  isAddAirlineFormVisible: boolean = false;
  newAirline: Airline = { id: 0, name: '', numberOfFlights: 0, date: '', country: '' };  // Updated to include country
  confirmDelete: boolean = false;

  constructor(private airlineService: AirlineService) {}

  ngOnInit(): void {
    this.loadAirlines();  // Load airlines when the component initializes
  }

  loadAirlines(): void {
    this.airlineService.getAllAirlines().subscribe(
      (response: Airline[]) => {
        this.airlines = response;
      },
      (error) => {
        console.error('Error loading airlines:', error);
      }
    );
  }

  searchAirlines(): void {
    // Filter airlines based on search term
    this.airlines = this.airlines.filter(airline =>
      airline.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      airline.id.toString().includes(this.searchTerm)
    );
  }

  openAddAirlineForm(): void {
    this.isAddAirlineFormVisible = true;
  }

  closeAddAirlineForm(): void {
    this.isAddAirlineFormVisible = false;
    this.resetNewAirlineForm();
  }

  submitAddAirline(): void {
    if (this.newAirline.name && this.newAirline.numberOfFlights >= 0 && this.newAirline.date && this.newAirline.country) {
      this.airlineService.addAirline(this.newAirline).subscribe(
        (response) => {
          console.log('Airline added successfully:', response);
          this.loadAirlines();  // Reload airlines
          this.closeAddAirlineForm();  // Close the form
        },
        (error) => {
          console.error('Error adding airline:', error);
        }
      );
    } else {
      console.log('Please fill out all fields');
    }
  }

  addFlight(id: number): void {
    this.airlineService.addFlight(id).subscribe(
      (response) => {
        console.log('Flight added');
        this.loadAirlines();  // Reload airlines to reflect changes
      },
      (error) => {
        console.error('Error adding flight:', error);
      }
    );
  }

  removeFlight(id: number): void {
    this.airlineService.removeFlight(id).subscribe(
      (response) => {
        console.log('Flight removed');
        this.loadAirlines();  // Reload airlines
      },
      (error) => {
        console.error('Error removing flight:', error);
      }
    );
  }

  deleteAirline(id: number): void {
    if (confirm('Are you sure you want to delete this airline?')) {
      this.airlineService.deleteAirline(id).subscribe(
        (response) => {
          console.log('Airline deleted');
          this.loadAirlines();  // Reload airlines
        },
        (error) => {
          console.error('Error deleting airline:', error);
        }
      );
    }
  }

  resetNewAirlineForm(): void {
    this.newAirline = { id: 0, name: '', numberOfFlights: 0, date: '', country: '' };
  }
}
