import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foro-detail',
  standalone: true,
  imports: [CommonModule, MenuComponent], 
  templateUrl: './foro-detail.component.html',
  styleUrls: ['./foro-detail.component.css']
})
export class ForoDetailComponent {
  publicacion: any; 
  comentarios: any[] = []; 
  sidebarOpen = false;

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/foro']); 
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen; 
  }
}
