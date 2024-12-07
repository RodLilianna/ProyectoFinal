import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private baseUrl = 'http://localhost:5255/api/Comments'; // Base URL for comments

  constructor(private http: HttpClient) {}

  // Get comments for a post
  getComments(postId: number, headers: HttpHeaders): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${postId}`, { headers, withCredentials: true });
  }

  // Add a new comment to a post
  addComment(commentData: any, headers: HttpHeaders): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, commentData, { headers, withCredentials: true });
  }
}
