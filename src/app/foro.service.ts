import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForoService {
  // datos simulados, despues conectamos al back!
  publicaciones = [
    {
      id: 1,
      titulo: 'Recomendaciones de pesticidas',
      autor: 'Hilari Medina',
      fecha: '19/09/2024',
      contenido: 'Hola, Bueno, desde hace ya varias semanas he notado que el pesticida que tengo ya no está trayendo los resultados que espero.',
      comentarios: [
        { autor: 'Lilianna Rodríguez', texto: 'Te recomiendo entrar a Amazon y guiarte de los reviews.' },
        { autor: 'Gabriela González', texto: 'Mi abuela me enseñó una opción casera...' }
      ]
    },
    // Otras publicaciones
  ];

  constructor() { }

  getPublicaciones() {
    return this.publicaciones;
  }

  getPublicacionById(id: number) {
    return this.publicaciones.find(pub => pub.id === id);
  }
}
