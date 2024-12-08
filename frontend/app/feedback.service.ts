import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Feedback } from './interface/feedback';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  // Correct API URL for FeedbackController
  private apiUrl = 'http://localhost:8080/api/feedback'; // Backend API URL

  // Manage local state for quick UI updates
  private feedbackListSubject = new BehaviorSubject<Feedback[]>([]);
  feedbackList$ = this.feedbackListSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Fetch all feedback from the backend and update the local state
  getFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl).pipe(
      tap((feedbackList) => this.feedbackListSubject.next(feedbackList)), // Update BehaviorSubject
      catchError(this.handleError<Feedback[]>('getFeedback', []))
    );
  }

  // Add new feedback by sending a POST request to the backend
  addFeedback(feedback: Feedback): Observable<Feedback> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Feedback>(this.apiUrl, feedback, { headers }).pipe(
      tap((newFeedback) => {
        // Update local state with the new feedback
        const currentFeedback = this.feedbackListSubject.value;
        this.feedbackListSubject.next([...currentFeedback, newFeedback]);
      }),
      catchError(this.handleError<Feedback>('addFeedback'))
    );
  }

  // Delete feedback by sending a DELETE request to the backend
  deleteFeedback(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        // Remove the feedback locally
        const updatedFeedback = this.feedbackListSubject.value.filter((fb) => fb.id !== id);
        this.feedbackListSubject.next(updatedFeedback);
      }),
      catchError(this.handleError<void>('deleteFeedback'))
    );
  }

  // Error handling function for HTTP requests
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return new BehaviorSubject(result as T).asObservable(); // Return default value
    };
  }
}