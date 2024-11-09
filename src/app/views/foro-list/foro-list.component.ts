import { Component, OnInit } from '@angular/core';
import { ForoService } from '../../foro.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-foro-list',
  standalone: true,  
  imports: [RouterModule, CommonModule, MenuComponent],  
  templateUrl: './foro-list.component.html',
  styleUrls: ['./foro-list.component.css']
})
export class ForoListComponent implements OnInit {
  publicaciones: any[] = [];

  constructor(private foroService: ForoService) {}

  ngOnInit(): void {
    this.publicaciones = [
      {
        usuario: 'Gabriela Gonzalez',
        titulo: 'Problemas con pesticidas y salud',
        fecha: '14 de Octubre, 2024',
        descripcion: 'Hola, bueno, desde hace ya varias semanas he notado que el pesticida que tengo ya no está trayendo los resultados que espero. De paso, siento que me está haciendo daño en mi salud, tengo desde hace ya un tiempo con tos y fatiga y no sé si se deba al pesticida pues desde que empecé a usarlo es que me pasa esto. ¿Alguna recomendación? Que sea un poco barato también, por favor.',
        id: 1 
      },
      {
        usuario: 'Lilianna Rodriguez',
        titulo: 'Efectos secundarios de los pesticidas',
        fecha: '13 de Octubre, 2024',
        descripcion: 'He estado usando un pesticida y he notado algunos efectos secundarios, como irritación en la piel. ¿Qué debería hacer?',
        id: 2
      }
    ];
  }

  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
