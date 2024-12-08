import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-acceuil',
  templateUrl: './admin-acceuil.component.html',
  styleUrl: './admin-acceuil.component.css'
})
export class AdminAcceuilComponent {
  currentSection: string = 'airlineManagement'; 

  constructor() { }

  ngOnInit(): void {
    
  }

  
  switchSection(section: string) {
    this.currentSection = section;
  }
}
