import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommentsService } from '../../services/comments.service';
import { MenuComponent } from "../menu/menu.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foro-detail',
  templateUrl: './foro-detail.component.html',
  styleUrls: ['./foro-detail.component.css'],
  standalone: true,
  imports: [MenuComponent, FormsModule, CommonModule],
})
export class ForoDetailComponent implements OnInit {
  topic: any;  // Tema relacionado con la publicación
  post: any;    // Publicación
  comments: any[] = [];
  postId!: number;
  showModal: boolean = false;
  submitContent: string = '';
  username: string = '';

  private apiPostUrl = 'http://localhost:5255/api/Post';
  private apiTopicUrl = 'http://localhost:5255/api/Topic';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private commentsService: CommentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.postId) {
      this.router.navigate(['/foro']);
    }
    this.loadPostDetails();
  }
  
  loadPostDetails(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
    });
  
    this.http.get<any>(`${this.apiPostUrl}/${this.postId}`, { headers, withCredentials: true })
      .subscribe({
        next: (response: any) => {
          this.post = response;
          this.post.date = new Date().toLocaleDateString();  // Usamos la fecha actual como en list
          this.loadUserDetails(this.post.userId);  // Cargar los detalles del autor del post
          const topicId = response.topicId;
          if (topicId) {
            this.loadTopicDetails(topicId);
          }
          this.loadComments();
        },
        error: (err: any) => {
          console.error('Error al cargar detalles del post:', err);
          this.router.navigate(['/foro']);
        },
      });
  }
  
  
  loadUserDetails(userId: string): void {
    if (userId) {
      this.authService.getUserDetails(userId).subscribe(
        (userDetails) => {
          this.username = `${userDetails.firstName} ${userDetails.lastName}` || 'Usuario';
        },
        (error) => {
          console.error('Error al obtener los detalles del usuario:', error);
          this.username = 'Invitado'; // Valor por defecto si hay un error
        }
      );
    } else {
      this.username = 'Invitado'; // Valor por defecto si no hay userId
    }
  }
  
  loadComments(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
    });
  
    this.commentsService.getComments(this.postId, headers)
      .subscribe({
        next: (response: any) => {
          this.comments = response || [];
          this.comments.forEach(comment => {
            // Asignamos el nombre del usuario
            this.loadCommentUserDetails(comment.userId, comment);
            
            // Asignamos la fecha, asegurándonos de que sea legible
            comment.date = new Date(comment.timestamp).toLocaleDateString(); // Usamos `timestamp` o el nombre de la propiedad de la fecha
          });
        },
        error: (err: any) => {
          console.error('Error al cargar comentarios:', err);
        },
      });
  }
  
  loadCommentUserDetails(userId: string, comment: any): void {
    this.authService.getUserDetails(userId).subscribe(
      (userDetails) => {
        // Asignamos el nombre del usuario a cada comentario
        comment.username = `${userDetails.firstName} ${userDetails.lastName}` || 'Usuario';
      },
      (error) => {
        console.error('Error al obtener los detalles del usuario del comentario:', error);
        comment.username = 'Invitado'; // Valor por defecto si hay un error
      }
    );
  }
  
  // Cargar el tema
  loadTopicDetails(topicId: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
    });

    this.http.get<any>(`${this.apiTopicUrl}/${topicId}`, { headers, withCredentials: true })
      .subscribe({
        next: (response: any) => {
          console.log('Topic details loaded:', response);
          this.topic = response;  // Asignamos los detalles del tema
        },
        error: (err: any) => {
          console.error('Error al cargar detalles del topic:', err);
        },
      });
  }

  // Función para agregar comentario
  addComment(): void {
    if (!this.submitContent.trim()) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
    });

    const commentData = {
      content: this.submitContent,
      userId: this.authService.getUserId(),
      postId: this.postId,
    };

    this.commentsService.addComment(commentData, headers)
      .subscribe({
        next: (response: any) => {
          console.log('Comentario agregado:', response);
          this.comments.push(response);  // Esto debería agregar el comentario a la lista
          this.submitContent = ''; // Limpiar el campo de texto
          this.toggleModal(); // Cerrar el modal
        },
        error: (err: any) => {
          console.error('Error al agregar comentario:', err);
        },
      });
  }

  // Función para abrir y cerrar el modal
  toggleModal(): void {
    this.showModal = !this.showModal;  // Alterna el valor de showModal
  }

  // Función para volver al foro
  goBack(): void {
    this.router.navigate(['/foro']);
  }
}
