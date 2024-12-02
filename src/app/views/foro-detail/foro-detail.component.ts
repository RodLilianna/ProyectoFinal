import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component'; 
import { CommonModule } from '@angular/common';
import { ForoDetailService } from './foro-detail.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-foro-detail',
  standalone: true,
  imports: [CommonModule, MenuComponent,FormsModule], 
  templateUrl: './foro-detail.component.html',
  styleUrls: ['./foro-detail.component.css']
})
export class ForoDetailComponent implements OnInit {
  publicacion: any = {};
  comentarios: any[] = [];
  nuevoComentario: string = '';
  descripcion!: string;

  constructor(
    private route: ActivatedRoute,
    private ForoDetailService: ForoDetailService
  ) {}

  ngOnInit(): void {
    this.descripcion = '';
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDetallePublicacion(id);
  }

  cargarDetallePublicacion(id: number): void {
    this.ForoDetailService.getDetallePublicacion(id).subscribe(
      (data) => {
        this.publicacion = data;
        this.cargarComentarios(data.id); 
      },
      (error) => {
        console.error('Error al cargar detalles', error);
      }
    );
  }

  cargarComentarios(topicId: number): void {
    this.ForoDetailService.getComentarios(topicId).subscribe(
      (data) => {
        this.comentarios = data;
      },
      (error) => {
        console.error('Error al cargar comentarios', error);
      }
    );
  }

  agregarComentario(): void {
    if (this.nuevoComentario.trim()) {
      const comentario = {
        content: this.nuevoComentario,
        userId: '7ef55abf-603c-4751-a282-eb5627ff1dc9', 
        topicId: this.publicacion.id
      };

      this.ForoDetailService.agregarComentario(comentario).subscribe(
        (data) => {
          this.comentarios.push(data);
          this.nuevoComentario = '';
        },
        (error) => {
          console.error('Error al agregar comentario', error);
        }
      );
    }
  }
}

// export class ForoDetailComponent {
//   publicacion: any; 
//   comentarios: any[] = []; 
//   sidebarOpen = false;

//   constructor(private router: Router) {}

//   goBack(): void {
//     this.router.navigate(['/foro']); 
//   }

//   toggleSidebar() {
//     this.sidebarOpen = !this.sidebarOpen; 
//   }
// }
