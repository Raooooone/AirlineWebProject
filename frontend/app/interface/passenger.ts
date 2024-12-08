export interface Passenger {
  pid: string;          // Unique ID for the passenger
  fullName: string;
  passport: string;
  mobileNumber: string;
  dob: string;          // Date of birth
  gender: string;
  flightNumber: string;
  seatClass: string;
  from: string;         // Departure location
  to: string;           // Destination location
  bookingts: string;    // Timestamp of booking
  flightDate: string;   // Flight date
  flightTime: string;   // Flight time
}
