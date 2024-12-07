import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost:5255/api/WeatherData';

  constructor(private http: HttpClient) {}

  getWeatherData(city: string): Observable<any> {
    const url = `${this.apiUrl}/${encodeURIComponent(city)}`; 
    return this.http.get<any>(url);
  }
}
