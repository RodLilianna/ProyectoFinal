import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class ForoListService {

  private apiUrl = 'https://localhost:7125/api/Topic'; 

  constructor(private http: HttpClient) {}

  crearPublicacion(newEntry: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.apiUrl, newEntry, { headers });
  }

  getPublicaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}