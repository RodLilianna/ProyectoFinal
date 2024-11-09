import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css'
})


export class NewsDetailComponent implements OnInit {
  newsTitle: string = 'Agricultura Regenerativa: Ventajas y Desventajas';
  newsCategory: string = 'Prácticas Agrícolas';
  newsDate: string = '21/05/2024';
  newsImage: string = 'path-to-your-news-image.jpg';
  newsBody: string[] = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit...'
  ];

  constructor() {}

  ngOnInit(): void {}
}
