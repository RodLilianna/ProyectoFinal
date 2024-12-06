import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForoService {
  private postApiUrl = 'http://localhost:5255/api/Post';
  private topicApiUrl = 'http://localhost:5255/api/Topic';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Cambiar según tu método de almacenamiento
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.postApiUrl}/recent`, {
      headers: this.getHeaders(),
    });
  }

  getTopics(): Observable<any[]> {
    return this.http.get<any[]>(this.topicApiUrl, {
      headers: this.getHeaders(),
    });
  }

  createTopic(topic: any): Observable<any> {
    return this.http.post<any>(this.topicApiUrl, topic, {
      headers: this.getHeaders(),
    });
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(this.postApiUrl, post, {
      headers: this.getHeaders(),
    });
  }
}
