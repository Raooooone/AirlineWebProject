export interface Flight {
  flightNumber: string;
  departure: string;       // Departure airport or city
  arrival: string;         // Arrival airport or city
  departureDate: string;   // Flight date (e.g., '2024-12-10')
  departureTime: string;   // Flight time (e.g., '10:00 AM')
  arrivalTime: string;     // Arrival time (e.g., '12:00 PM')
}
