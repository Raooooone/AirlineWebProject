import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { User } from '../interface/user';  // Assuming a user model is defined

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
})
export class AddMemberComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  role: string = 'admin'; // Default role for new admin members
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private adminService: AdminService) {}

  onAddMember(): void {
    // Check if all required fields are filled
    if (!this.username || !this.password || !this.email) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    // Create a new admin member object
    const newAdmin: User = {
      username: this.username,
      password: this.password,
      email: this.email,
      role: this.role,  // The role should be 'admin' for admin members
    };

    // Call the AdminService to add the new admin member
    this.adminService.addAdmin(newAdmin).subscribe(
      (user) => {
        this.successMessage = 'New admin member added successfully!';
        this.errorMessage = '';
        // Reset the form after successful addition
        this.resetForm();
      },
      (error) => {
        this.errorMessage = 'Error adding new admin member. Please try again.';
        this.successMessage = '';
      }
    );
  }

  private resetForm(): void {
    // Reset the form fields after submission
    this.username = '';
    this.password = '';
    this.email = '';
  }
}
