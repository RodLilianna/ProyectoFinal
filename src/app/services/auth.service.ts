import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginCredentials } from '../models/login-credentials.model'; // Asegúrate de que este archivo exista
import jwt_decode from 'jwt-decode';
import { AuthResponse } from '../models/auth-response.model'; // Asegúrate de importar la interfaz correctamente

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/User/Authentication';  // URL para login
  private forgotPasswordUrl = '/api/User/forgot-password';  // URL para solicitud de contraseña
  private resetPasswordUrl = '/api/User/reset-password';  // URL para restablecer contraseña
  
  constructor(private http: HttpClient) {}
  
  // Método de autenticación
  authenticate(userData: LoginCredentials): Observable<AuthResponse> {  // Aquí se cambia el tipo de la respuesta
    return this.http.post<AuthResponse>(this.apiUrl, userData).pipe(
      catchError(this.handleError),
      // Procesar la respuesta cuando se reciba el token
      tap((response) => {
        if (response && response.token) {
          // Almacenar el token en el localStorage
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  // Método para obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('authToken');
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

  // Método para obtener el ID del usuario desde el token
  getUserId(): string | null {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.userId || decodedToken.sub;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
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
