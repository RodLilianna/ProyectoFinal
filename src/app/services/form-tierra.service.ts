import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormTierraService {
  private apiUrl = 'https://localhost:7125/api/FormTierra';

  constructor(private http: HttpClient) {}

  saveFormData(data: any): Observable<any> {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('No se encontró usuarioId en localStorage');
      return throwError(() => new Error('No se encontró usuarioId en localStorage'));
    }

    // Añadir el usuarioId directamente al cuerpo de la solicitud
    const formData = { ...data, usuarioId: userId };

    return this.http.post(this.apiUrl, formData); // Ya no se necesita authToken en los headers
  }
}

