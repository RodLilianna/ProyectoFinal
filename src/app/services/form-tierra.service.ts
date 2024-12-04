import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormTierraService {
  private apiUrl = 'http://localhost:5255/api/FormTierra';

  constructor(private http: HttpClient) {}

  // Método para enviar el formulario
  sendFormData(formData: any): Observable<any> {
    // Obtener el authToken desde localStorage
    const authToken = localStorage.getItem('authToken');

    // Verificar si el authToken existe
    if (!authToken) {
      console.error('No se encontró el authToken');
      return new Observable(observer => observer.error('No se encontró el authToken'));
    }

    // Crear los encabezados de la solicitud con el authToken
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    // Hacer la solicitud HTTP POST al backend
    return this.http.post(this.apiUrl, formData, { headers });
  }
}
