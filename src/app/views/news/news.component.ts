import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  articles = [
    { id: 1, title: 'Agricultura Regenerativa: Ventajas y Desventajas', date: '21/05/2024', imageUrl: '/assets/fondo2.jpg' },
  ];

  constructor(private router: Router) {}

  goToDetail(article: any) {
    this.router.navigate(['/informaciones', article.id]);
  }
  
}
