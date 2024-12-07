import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = '022871c1e6554dcfbfc57e7f8d51db81'; // Reemplaza con tu clave de API
  private apiUrl = 'https://newsapi.org/v2/everything'; // URL de NewsAPI

  constructor(private http: HttpClient) {}

  getAgriculturalNews(query: string): Observable<any> {
    const url = `${this.apiUrl}?q=${query}&apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
