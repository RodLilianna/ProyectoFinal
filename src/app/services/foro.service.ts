import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForoService {
  private postApiUrl = 'http://localhost:5255/api/Post';
  private topicApiUrl = 'http://localhost:5255/api/Topic';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.postApiUrl}/recent`);
  }

  getTopics(): Observable<any[]> {
    return this.http.get<any[]>(this.topicApiUrl);
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(this.postApiUrl, post);
  }
}
