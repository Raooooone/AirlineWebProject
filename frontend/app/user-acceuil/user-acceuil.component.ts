import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-acceuil',
  templateUrl: './user-acceuil.component.html',
  styleUrl: './user-acceuil.component.css'
})
export class UserAcceuilComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Redirect to the user-form component when the dashboard is loaded
    this.router.navigate(['/formulaire']);
  }

}
