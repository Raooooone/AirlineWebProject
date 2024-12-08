import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Admin } from './interface/admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private admins: Admin[] = [
    { username: 'admin', email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { username: 'manager', email: 'manager@example.com', password: 'manager123', role: 'admin' },
  ];

  constructor() {}
  
  getAdminByUsername(username: string): Observable<Admin | null> {
    const admin = this.admins.find(admin => admin.username === username);
    return of(admin || null); 
  }

  
  authenticate(username: string, email: string, password: string): Observable<Admin | null> {
    const admin = this.admins.find(
      (admin) => admin.username === username && admin.email === email && admin.password === password
    );
    return of(admin || null);
  }
  addAdmin(admin: Admin): Observable<Admin> {
    this.admins.push(admin);
    return of(admin); 
  }
}
