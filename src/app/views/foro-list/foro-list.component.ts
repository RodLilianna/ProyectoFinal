import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { ForoService } from '../../services/foro.service';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-foro-list',
  standalone: true,
  imports: [RouterModule, CommonModule, MenuComponent, FormsModule], // Agregar FormsModule aquí
  templateUrl: './foro-list.component.html',
  styleUrls: ['./foro-list.component.css'],
})
export class ForoListComponent implements OnInit {
  publicaciones: any[] = [];
  showModal: boolean = false;
  searchTerm: string = ''; // Texto de búsqueda
  filteredPublicaciones: any[] = [];

  constructor(private foroService: ForoService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.foroService.getPosts().subscribe(
      (posts) => {
        this.foroService.getTopics().subscribe(
          (topics) => {
            // Relacionar los posts con sus topics
            this.publicaciones = posts.map((post) => {
              const topic = topics.find((t) => t.id === post.topicId);
              return {
                id: post.id,
                titulo: topic?.title || 'Sin título', // Título del topic
                descripcion: post.content,           // Contenido del post
                usuario: post.userId,                // ID del usuario
                fecha: new Date().toLocaleDateString(),
              };
            });
            console.log('Publicaciones combinadas:', this.publicaciones); // Depuración
          },
          (error) => console.error('Error al cargar topics:', error)
        );
      },
      (error) => console.error('Error al cargar posts:', error)
    );
  }
  
  filterPosts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPublicaciones = this.publicaciones.filter((pub) =>
      pub.titulo.toLowerCase().includes(term) || pub.descripcion.toLowerCase().includes(term)
    );
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  submitPost(formData: any): void {
    const topic = {
      title: formData.titulo,
      userId: 'usuario123', // Ajusta según la sesión actual
    };

    // Crear el topic primero
    this.foroService.createTopic(topic).subscribe(
      (topicResponse) => {
        console.log('Topic creado:', topicResponse);

        // Crear el post asociado al topic
        const post = {
          content: formData.descripcion,
          userId: 'usuario123', // Ajusta según la sesión actual
          topicId: topicResponse.id, // Usar el ID del topic recién creado
        };

        this.foroService.createPost(post).subscribe(
          (postResponse) => {
            console.log('Post creado:', postResponse);
            this.loadPosts(); // Recargar publicaciones
            this.toggleModal(); // Cerrar modal
          },
          (error) => {
            console.error('Error al crear post:', error);
          }
        );
      },
      (error) => {
        console.error('Error al crear topic:', error);
      }
    );
  }
}
