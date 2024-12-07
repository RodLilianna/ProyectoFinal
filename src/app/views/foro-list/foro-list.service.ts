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

  getPublicaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPublicacion(publicacion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, publicacion);
  }
}