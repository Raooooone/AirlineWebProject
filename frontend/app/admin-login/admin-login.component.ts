import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service'; // Admin authentication service

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  username: string = '';
  email: string = '';  // Add email property
  password: string = '';
  errorMessage: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  /**
   * Handles admin login submission.
   */
  onLogin(): void {
    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Please enter username, email, and password.';
      return;
    }

    // Pass all three arguments: username, email, and password
    this.adminService.authenticate(this.username, this.email, this.password).subscribe(
      (admin) => {
        if (admin) {
          this.errorMessage = '';
          this.router.navigate(['/adminAcceuil']); // Redirect to the admin dashboard
        } else {
          this.errorMessage = 'Invalid username, email, or password.';
          this.resetForm();
        }
      },
      (error) => {
        this.errorMessage = 'Something went wrong. Please try again later.';
        this.resetForm();
      }
    );
  }

  /**
   * Resets the login form after a failed attempt.
   */
  private resetForm(): void {
    this.password = '';
  }
}
