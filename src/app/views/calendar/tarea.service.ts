import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private apiUrl = 'http://localhost:5255/api/Task';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task).pipe(
      catchError(error => {
        console.error('Error creating task:', error);
        return throwError(() => new Error('Task creation failed'));
      })
    );
  }
  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  searchTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateTask(id: number, updatedTask: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedTask);
  }
}
