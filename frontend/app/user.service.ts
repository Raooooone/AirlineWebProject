import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/user'; // Backend URL (Change port if needed)

  constructor(private http: HttpClient) {}

  // Authenticate user with the backend
  authenticate(username: string, password: string): Observable<User | null> {
    return this.http.post<User>(`${this.baseUrl}/authenticate`, { username, password });
  }

  // Sign up a new user
  signUp(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/signup`, newUser);
  }
}
