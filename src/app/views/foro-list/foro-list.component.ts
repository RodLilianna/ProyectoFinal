// foro-list.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { ForoService } from '../../services/foro.service';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../services/auth.service'; // Importamos AuthService

@Component({
  selector: 'app-foro-list',
  standalone: true,
  imports: [RouterModule, CommonModule, MenuComponent, FormsModule],
  templateUrl: './foro-list.component.html',
  styleUrls: ['./foro-list.component.css'],
})
export class ForoListComponent implements OnInit {
  publicaciones: any[] = [];
  filteredPublicaciones: any[] = [];
  showModal: boolean = false;
  searchTerm: string = ''; 
  postsPerPage = 2;
  currentPage = 1;
  totalPages = 1;
  hasMorePosts = true;
  username: string = ''; // Variable para almacenar el nombre del usuario

  constructor(
    private foroService: ForoService,
    private authService: AuthService, // Inyectamos AuthService
    private cdr: ChangeDetectorRef // Inyectamos ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.loadPosts(); // Cargar las publicaciones 
    }

    loadPosts(): void {
      this.foroService.getPosts().subscribe(
        (posts) => {
          this.foroService.getTopics().subscribe(
            (topics) => {
              this.publicaciones = posts.map((post) => {
                const topic = topics.find((t) => t.id === post.topicId);
        
                // Llamamos a loadPostUserDetails con el userId del post
                this.loadPostUserDetails(post.userId, post);  // Aquí estamos pasando los parámetros correctos
        
                return {
                  id: post.id,
                  titulo: topic?.title || 'Sin título',
                  descripcion: post.content,
                  usuario: post.username,  // Usamos el username que se asigna en loadPostUserDetails
                  fecha: new Date().toLocaleDateString(),  // Fecha actual
                };
              });
        
              this.totalPages = Math.ceil(this.publicaciones.length / this.postsPerPage);
              this.updateFilteredPosts();
            },
            (error) => console.error('Error al cargar topics:', error)
          );
        },
        (error) => console.error('Error al cargar posts:', error)
      );
    }
    
    
    loadPostUserDetails(userId: string, post: any): void {
      this.authService.getUserDetails(userId).subscribe(
        (userDetails) => {
          // Asignamos el nombre completo del usuario a cada publicación
          post.username = `${userDetails.firstName} ${userDetails.lastName}` || 'Usuario';
        },
        (error) => {
          console.error('Error al obtener los detalles del usuario del post:', error);
          post.username = 'Invitado'; // Valor por defecto si hay un error
        }
      );
    }
    
  updateFilteredPosts(): void {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    this.filteredPublicaciones = this.publicaciones.slice(startIndex, endIndex);
  }
  

  filterPosts(): void {
    const term = this.searchTerm.toLowerCase();
    const filtered = this.publicaciones.filter((pub) =>
      pub.titulo.toLowerCase().includes(term) || pub.descripcion.toLowerCase().includes(term)
    );
  
    this.totalPages = Math.ceil(filtered.length / this.postsPerPage);
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    this.filteredPublicaciones = filtered.slice(startIndex, endIndex);
  }
  
  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  submitPost(formData: any): void {
    const topic = {
      title: formData.titulo,
      userId: this.authService.getUserId(), // Se mantiene el userId aquí si es necesario para crear el topic
    };

    // Crear el topic primero
    this.foroService.createTopic(topic).subscribe(
      (topicResponse) => {
        const post = {
          content: formData.descripcion,
          userId: this.authService.getUserId(), // Usamos getUserId si es necesario para el post
          topicId: topicResponse.id,
        };

        this.foroService.createPost(post).subscribe(
          (postResponse) => {
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

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateFilteredPosts(); // Actualiza las publicaciones visibles
    }
  }
  

}
