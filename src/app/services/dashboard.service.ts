import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';  // Asegurarse de que AuthService está importado
import { RecomendacionViewModel } from '../models/recomendacion.model';
import { TaskViewModel} from "../models/task.model";
import { WeatherDataViewModel } from '../models/weather.model';  // Importar el modelo WeatherDataViewModel

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private recommendationApiUrl = '/api/FormTierra/GetFormsByUserId';  // Endpoint para obtener las recomendaciones
  private weatherApiUrl = '/api/WeatherData'; 

  constructor(private http: HttpClient) {}

  getRecommendations(userId: string): Observable<RecomendacionViewModel[]> {
    const authToken = localStorage.getItem('authToken');  // Obtener token del localStorage

    if (!authToken) {
      return throwError(() => new Error('Token no encontrado. No se puede obtener recomendaciones.'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,  // Se agrega el token en la cabecera
    });

    return this.http.get<any>(`${this.recommendationApiUrl}/${userId}`, { 
      headers, 
      withCredentials: true  // Asegúrate de pasar las credenciales si es necesario
    }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error fetching recommendations:', error);
    
    // Aquí se puede mejorar el mensaje de error dependiendo del tipo de error
    let errorMessage = 'Error al obtener recomendaciones';

    if (error.status === 401) {
      errorMessage = 'No autorizado. El token puede haber expirado.';
    } else if (error.status === 404) {
      errorMessage = 'Recomendaciones no encontradas.';
    }

    return throwError(() => new Error(errorMessage));
  }

  // TASKS 
  getTasks(): Observable<TaskViewModel[]> {
    const authToken = localStorage.getItem('authToken');  // Obtener token del localStorage
  
    if (!authToken) {
      return throwError(() => new Error('Token no encontrado. No se pueden obtener tareas.'));
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,  // Se agrega el token en la cabecera
    });
  
    return this.http.get<TaskViewModel[]>('/api/Task', { 
      headers, 
      withCredentials: true
    }).pipe(
      catchError((error) => {
        console.error('Error al obtener las tareas:', error);
        return throwError(() => new Error('Error al obtener las tareas'));
      })
    );
  }
  
   // Método para obtener los datos del clima de una ubicación
   getWeatherData(location: string): Observable<WeatherDataViewModel> {
    const authToken = localStorage.getItem('authToken');  // Obtener token del localStorage

    if (!authToken) {
      return throwError(() => new Error('Token no encontrado. No se pueden obtener datos del clima.'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`  // Agregar el token en la cabecera
    });

    return this.http.get<WeatherDataViewModel>(`${this.weatherApiUrl}/${location}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener los datos del clima:', error);
          return throwError(() => new Error('Error al obtener los datos del clima.'));
        })
      );
  }
}
