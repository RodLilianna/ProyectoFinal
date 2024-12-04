import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginCredentials } from '../models/login-credentials.model'; // Asegúrate de que este archivo existe

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5255/api/User/Authentication';  // URL de autenticación
  private forgotPasswordUrl = 'http://localhost:7125/api/User/forgot-password';  // URL para olvido de contraseña
  private resetPasswordUrl = 'http://localhost:7125/api/User/reset-password';  // URL para resetear contraseña

  constructor(private http: HttpClient) {}

  // Método de autenticación
  authenticate(userData: LoginCredentials): Observable<any> {
    return this.http.post(this.apiUrl, userData).pipe(catchError(this.handleError));
  }

  // Método para enviar correo de recuperación de contraseña
  forgotPassword(email: string): Observable<any> {
    return this.http
      .post(this.forgotPasswordUrl, { email })
      .pipe(catchError(this.handleError));
  }

  // Método para restablecer la contraseña
  resetPassword(payload: { email: string; password: string; confirmPassword: string; token: string }): Observable<any> {
    return this.http
      .post(this.resetPasswordUrl, payload)
      .pipe(catchError(this.handleError));
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      console.error('Ocurrió un error del lado del cliente:', error.error.message);
    } else {
      // Error del servidor
      console.error(`Backend devolvió el código ${error.status}, cuerpo:`, error.error);
      
      // Mostrar errores detallados
      if (error.status === 400 && error.error.errors) {
        // Si es un error de validación, mostramos los detalles
        console.error('Errores de validación:', error.error.errors);
        return throwError(() => new Error('Errores de validación: ' + JSON.stringify(error.error.errors)));
      }
    }
    return throwError(() => new Error('Hubo un problema con la autenticación. Por favor, intenta nuevamente.'));
  }
}
