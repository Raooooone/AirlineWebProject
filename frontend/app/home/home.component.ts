import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title = 'Tunisia Airline';
  showFeedbackForm: boolean = false;
  feedbackSubmitted: boolean = false;

  feedback: any = {
    email: '',
    firstImpression: '',
    suggestion: '',
    rating: '',
    service: ''
  };

  constructor(private router: Router, private feedbackService: FeedbackService) {}

  navigateToLogin() {
   
    this.router.navigateByUrl('/login');
  }


  openFeedbackForm(): void {
    this.showFeedbackForm = true;
    this.feedbackSubmitted = false;
  }

  submitFeedback(): void {
    const newFeedback = {
      ...this.feedback,
      rating: parseFloat(this.feedback.rating), 
    };

    this.feedbackService.addFeedback(newFeedback).subscribe(
      (response: any) => {
        console.log('Feedback submitted successfully:', response);
        this.feedbackSubmitted = true;
        this.showFeedbackForm = false; 
      },
      (error: any) => {
        console.error('Error submitting feedback:', error);
      }
    );
  }
}

