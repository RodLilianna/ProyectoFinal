import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private registerUrl = 'http://localhost:5255/api/User/Register'; // URL para registrar al usuario
  private confirmEmailUrl = 'http://localhost:5255/api/User/confirm-email'; // URL para confirmar el correo del usuario

  constructor(private http: HttpClient) {}

  // Método para registrar un usuario
  register(userData: any): Observable<any> {
    const queryParams = new URLSearchParams();

    // Asignar parámetros al objeto de consulta
    queryParams.set('Id', userData.Id || '');
    queryParams.set('FirstName', userData.firstName);
    queryParams.set('LastName', userData.lastName);
    queryParams.set('UserName', userData.userName);
    queryParams.set('Email', userData.email);
    queryParams.set('Password', userData.password);
    queryParams.set('ConfirmPassword', userData.confirmPassword);
    queryParams.set('SelectRole', '1'); // Asignar siempre el rol de usuario
    queryParams.set('IsActive', userData.isActive.toString());
    queryParams.set('HasError', userData.hasError.toString());
    queryParams.set('Error', userData.error || '');

    const urlWithParams = `${this.registerUrl}?${queryParams.toString()}`;

    return this.http.post(urlWithParams, {}).pipe(catchError(this.handleError));
  }

  // Método para confirmar el correo del usuario
  confirmEmail(userId: string, token: string): Observable<any> {
    const params = { userId, token }; // Parámetros necesarios para la confirmación
    return this.http
      .get(this.confirmEmailUrl, { params, responseType: 'text' }) // Cambia el tipo de respuesta a texto
      .pipe(
        catchError(this.handleError),
        // Intenta parsear la respuesta como JSON; si falla, devuelve el texto plano
        map((response) => {
          try {
            return JSON.parse(response); // Si es JSON, lo parseamos
          } catch {
            return { message: response }; // Si no, lo tratamos como texto plano
          }
        })
      );
  }
  

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      console.error('Ocurrió un error del lado del cliente:', error.error.message);
    } else {
      // Error del servidor
      console.error(`Backend devolvió el código ${error.status}, cuerpo:`, error.error);

      // Mostrar errores detallados si es un error de validación
      if (error.status === 400 && error.error.errors) {
        console.error('Errores de validación:', error.error.errors);
        return throwError(() => new Error('Errores de validación: ' + JSON.stringify(error.error.errors)));
      }
    }
    return throwError(() => new Error('Hubo un problema con el registro. Por favor, intenta nuevamente.'));
  }
}
