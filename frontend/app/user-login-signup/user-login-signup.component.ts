import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; // Import the UserService
import { User } from '../interface/user'; // Import the User model

@Component({
  selector: 'app-user-login-signup',
  templateUrl: './user-login-signup.component.html',
  styleUrls: ['./user-login-signup.component.css'],
})
export class UserLoginSignupComponent {
  users: User[] = [
    
    { username: 'user', password: 'user123', role: 'user', email: 'user@example.com' },
  ];
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = ''; // Add email field for signup
  isSignUp: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  toggleSignUp(): void {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onLogin(): void {
    this.userService.authenticate(this.username, this.password).subscribe(
      (user: User | null) => {
        if (user) {
          // Login successful
          this.successMessage = 'Login successful!';
          this.errorMessage = '';
          // Navigate based on role
          if (user.role === 'admin') {
            this.router.navigate(['/adminAcceuil']);
          } else {
            this.router.navigate(['/userAcceuil']);
          }
        } else {
          this.errorMessage = 'Invalid username or password';
          this.successMessage = '';
        }
      },
      (error) => {
        this.errorMessage = 'Something went wrong. Please try again.';
        this.successMessage = '';
      }
    );
  }

  onSignUp(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (!this.email || !this.username) {
      this.errorMessage = 'Username and email are required';
      return;
    }

    const newUser: User = {
      username: this.username,
      password: this.password,
      email: this.email, // Include email in the signup data
      role: 'user', // Assign role as 'user' by default
    };

    this.userService.signUp(newUser).subscribe(
      (user: User) => {
        this.successMessage = 'Signup successful! Please login.';
        this.errorMessage = '';
        this.isSignUp = false; // Switch to login form after successful sign-up
      },
      (error) => {
        this.errorMessage = error.message || 'Error during signup';
        this.successMessage = '';
      }
    );
  }

  // Method to navigate to the admin login page
  navigateToAdminLogin(): void {
    this.router.navigate(['/admin-login']); // Route to admin login page
  }
}
