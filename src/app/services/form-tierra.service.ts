import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Asegúrate de importar AuthService

@Injectable({
  providedIn: 'root',
})
export class FormTierraService {
  private formTierraUrl = 'http://localhost:5255/api/FormTierra/FormTierra'; // Cambiar la URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  createFormTierra(data: any): Observable<any> {
    const token = this.authService.getToken(); // Obtener el token desde el servicio Auth
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post(this.formTierraUrl, data, { headers, withCredentials: true }).pipe( // Asegúrate de incluir withCredentials
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        throw error;
      })
    );
  }
}
