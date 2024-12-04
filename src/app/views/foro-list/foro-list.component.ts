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
  
  

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  submitPost(formData: any): void {
    const post = {
      content: formData.descripcion,
      userId: 'usuario123', // Ajusta este valor según la sesión del usuario
      topicId: 1, // Cambia este valor según sea necesario
    };

    this.foroService.createPost(post).subscribe(
      (response) => {
        console.log('Publicación creada:', response);
        this.loadPosts(); // Recarga la lista de publicaciones
        this.toggleModal(); // Cierra el modal
      },
      (error) => {
        console.error('Error al crear publicación:', error);
      }
    );
  }
}
