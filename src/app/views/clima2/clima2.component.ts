import { Component,OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clima2',
  standalone: true,
  imports: [MenuComponent,CommonModule,HttpClientModule,FormsModule],
  templateUrl: './clima2.component.html',
  styleUrl: './clima2.component.css'
})
export class Clima2Component implements OnInit {
  weatherData: any = {};
  selectedCity: string = ''; 
  errorMessage: string = '';

  constructor(private weatherService: WeatherService , private router: Router) {}

  ngOnInit(): void {
  }

  fetchWeatherData(): void {
    if (!this.selectedCity.trim()) {
      this.errorMessage = 'Por favor, ingresa una ciudad válida.';
      this.weatherData = {};
      return;
    }

    this.weatherService.getWeatherData(this.selectedCity).subscribe(
      (data) => {
        this.weatherData = data;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error al cargar datos del clima:', error);
        this.errorMessage = `No se encontraron datos para la ciudad "${this.selectedCity}".`;
        this.weatherData = {};
      }
    );
  }

  getIcon(description: string): string {
    const iconMap: { [key: string]: string } = {
      'clear sky': 'sunny.png',
      'few clouds': 'partly-cloudy.png',
      'scattered clouds': 'clouds.png',
      'broken clouds': 'clouds.png',
      'shower rain': 'shower.png',
      'rain': 'rain.png',
      'thunderstorm': 'thunderstorm.png',
      'snow': 'snow.png',
      'mist': 'mist.png',
      'lluvia ligera': 'drizzle.png',
    };
    return iconMap[description] || 'default.png';
  }

  redirectToLogIn() {
    this.router.navigate(['/login']);
  }
}