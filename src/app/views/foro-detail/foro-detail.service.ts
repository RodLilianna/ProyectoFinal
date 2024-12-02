import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForoDetailService {

  private apiUrlForo = 'https://localhost:7125/api/Topic'; 
  private apiUrlComentarios = 'https://localhost:7125/api/Post/topic'; 
  
  constructor(private http: HttpClient) { }
  getDetallePublicacion(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlForo}/posts/${id}`);
  }

  getComentarios(topicId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlComentarios}?topicId=${topicId}`);
  }

  agregarComentario(comentario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlComentarios}`, comentario);
  }

  getPublicacionById(id: number): Observable<any> { return this.http.get<any>(`${this.apiUrlForo}/${id}`); }
}
