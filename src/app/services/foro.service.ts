import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Importar AuthService

@Injectable({
  providedIn: 'root',
})
export class ForoService {
  private postApiUrl = 'http://localhost:5255/api/Post';
  private topicApiUrl = 'http://localhost:5255/api/Topic';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obtener las cabeceras con el token de autenticación
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Obtener el token desde AuthService
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Enviar el token en la cabecera Authorization
    });
  }

  // Obtener las publicaciones
  getPosts(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.postApiUrl}/recent`, {
      headers: headers,
      withCredentials: true, // Incluir las credenciales
    });
  }

  // Obtener los temas
  getTopics(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.topicApiUrl, {
      headers: headers,
      withCredentials: true, // Incluir las credenciales
    });
  }

  // Crear un nuevo tema
  createTopic(topic: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.topicApiUrl, topic, {
      headers: headers,
      withCredentials: true, // Incluir las credenciales
    });
  }

  // Crear una nueva publicación
  createPost(post: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.postApiUrl, post, {
      headers: headers,
      withCredentials: true, // Incluir las credenciales
    });
  }
  getPostById(postId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.postApiUrl}/${postId}`, { headers });
  }
  
  getTopicById(topicId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.topicApiUrl}/${topicId}`, { headers });
  }
  
  
}
