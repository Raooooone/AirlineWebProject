import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { Feedback } from '../interface/feedback';

@Component({
  selector: 'app-feedback-management',
  templateUrl: './feedback-management.component.html',
  styleUrls: ['./feedback-management.component.css'],
})
export class FeedbackManagementComponent implements OnInit {
  feedbackList: Feedback[] = [];
  filteredFeedbackList: Feedback[] = [];
  searchTerm: string = '';

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    // Subscribe to feedback updates
    this.feedbackService.getFeedback().subscribe((feedback) => {
      this.feedbackList = feedback; // Assign feedback data to the array
      this.filteredFeedbackList = [...this.feedbackList]; // Copy feedback list for filtering
    });
  }

  deleteFeedback(id: number): void {
    this.feedbackService.deleteFeedback(id);
  }

  searchFeedback(): void {
    if (this.searchTerm) {
      this.filteredFeedbackList = this.feedbackList.filter((feedback) =>
        feedback.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        feedback.firstImpression.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        feedback.suggestion.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredFeedbackList = [...this.feedbackList];
    }
  }
}
