import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private apiUrl = 'http://your-api-url.com/api';  // Replace with actual API URL

  constructor(private http: HttpClient) { }

  // Example: Fetch list of airlines
  getAirlines(): Observable<any> {
    return this.http.get(`${this.apiUrl}/airlines`);
  }

  // Other API methods for fetching or managing data can be added here

}
