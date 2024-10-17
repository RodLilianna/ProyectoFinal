import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component'; // Asegúrate de que esta ruta sea correcta
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-foro-detail',
  standalone: true,
  imports: [CommonModule, MenuComponent], // Asegúrate de incluir CommonModule aquí
  templateUrl: './foro-detail.component.html',
  styleUrls: ['./foro-detail.component.css']
})
export class ForoDetailComponent {
  publicacion: any; // Asegúrate de definir esto adecuadamente
  comentarios: any[] = []; // Asegúrate de obtener los comentarios
  sidebarOpen = false; // Estado del menú

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/foro']); // Cambia esto si necesitas volver a una ruta diferente
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen; // Cambia el estado del menú
  }
}
