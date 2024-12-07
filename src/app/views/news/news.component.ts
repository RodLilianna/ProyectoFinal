import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service'; 
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'; 

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  standalone: true,
  imports: [MenuComponent, CommonModule, FormsModule, NgxPaginationModule]
})
export class NewsComponent implements OnInit {
  articles: any[] = [];
  searchQuery: string = '';  
  currentPage: number = 1;
  pageSize: number = 6;  // Número de artículos por página

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.loadAgriculturalNews();
  }

  loadAgriculturalNews(): void {
    this.newsService.getAgriculturalNews('agricultura').subscribe((data: any) => {
      if (data && data.articles) {
        this.articles = data.articles.map((article: any) => ({
          title: article.title,
          date: article.publishedAt,
          imageUrl: article.urlToImage || '/assets/default-image.jpg',
          url: article.url,
        }));
      }
    });
  }

  goToDetail(article: any): void {
    window.open(article.url, '_blank');
  }

  onSearchChange(): void {
    this.filterArticlesBySearch();
  }

  filterArticlesBySearch(): void {
    if (this.searchQuery.trim()) {
      this.articles = this.articles.filter(article =>
        article.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadAgriculturalNews();  
    }
  }
}
