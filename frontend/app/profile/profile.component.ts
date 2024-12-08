import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service'; // Make sure this is the correct import path
import { Admin } from '../interface/admin';  // Admin interface

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  adminDetails: Admin | null = null;  // To store admin details
  errorMessage: string = ''; // Error message to show if something goes wrong

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAdminProfile();
  }

  private getAdminProfile(): void {
    const username = 'admin'; // Fixed username for testing, you can change it dynamically

    // Call the service method to get admin details by username
    this.adminService.getAdminByUsername(username).subscribe(
      (admin: Admin | null) => {
        if (admin) {
          this.adminDetails = admin;  // If admin is found, store it in adminDetails
        } else {
          this.errorMessage = 'Admin not found'; // If admin is not found
          this.adminDetails = null;
        }
      },
      (error) => {
        console.error('Error fetching admin details:', error);
        this.errorMessage = 'Failed to load admin profile.';
        this.adminDetails = null;
      }
    );
  }
}
