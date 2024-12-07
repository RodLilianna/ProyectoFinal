import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-climate-sect',
  standalone: true,
  templateUrl: './climate-sect.component.html',
  styleUrls: ['./climate-sect.component.css'],
  imports: [CommonModule, HttpClientModule, FormsModule,MenuComponent]
})
export class ClimateSectComponent implements OnInit {
  weatherData: any = {};
  selectedCity: string = '';
  hourlyData: any[] = [];
  dailyForecast: any[] = []; 
  errorMessage: string = '';
  isVisible = false; 

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit(): void {}

  fetchWeatherData(): void {
    this.weatherService.getWeatherData(this.selectedCity).subscribe(
      data => {
        this.weatherData = data;
        this.setHourlyData();
        this.setDailyForecast();
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = `Error: No se encontraron datos para la ciudad ${this.selectedCity}`;
        this.weatherData = {};
      }
    );
  }

  setHourlyData(): void {
    // Simula datos horarios (en una implementación real, estos vendrían de la API)
    this.hourlyData = [
      { time: '12 am', weatherDescription: this.weatherData.weatherDescription, temperature: 25 },
      { time: '1 am', weatherDescription: this.weatherData.weatherDescription, temperature: 25 },
      { time: '2 am', weatherDescription: this.weatherData.weatherDescription, temperature: 24 },
      { time: '3 am', weatherDescription: this.weatherData.weatherDescription, temperature: 24 },
      { time: '4 am', weatherDescription: this.weatherData.weatherDescription, temperature: 23 },
      { time: '5 am', weatherDescription: this.weatherData.weatherDescription, temperature: 23 },
      { time: '6 am', weatherDescription: this.weatherData.weatherDescription, temperature: 22 },
      { time: '7 am', weatherDescription: this.weatherData.weatherDescription, temperature: 22 },
      { time: '8 am', weatherDescription: this.weatherData.weatherDescription, temperature: 22 },
      { time: '9 am', weatherDescription: this.weatherData.weatherDescription, temperature: 23 },
      { time: '10 am', weatherDescription: this.weatherData.weatherDescription, temperature: 24 },
      { time: '11 am', weatherDescription: this.weatherData.weatherDescription, temperature: 25 },
      { time: '12 pm', weatherDescription: this.weatherData.weatherDescription, temperature: 26 },
      { time: '1 pm', weatherDescription: this.weatherData.weatherDescription, temperature: 27 },
      { time: '2 pm', weatherDescription: this.weatherData.weatherDescription, temperature: 28 },
      { time: '3 pm', weatherDescription: this.weatherData.weatherDescription, temperature: 29 },
      { time: '4 pm', weatherDescription: this.weatherData.weatherDescription, temperature: 30 },
      { time: '5 pm', weatherDescription: this.weatherData.weatherDescription, temperature: 31 },
      { time: '6 pm', weatherDescription: this.weatherData.weatherDescription, temperature: 30 },
      { time: '7 pm', weatherDescription: this.weatherData.weatherDescription, temperature: 29 },
      { time: '8 pm', weatherDescription: this.weatherData.weatherDescription, temperature: 28 },
      { time: '9 pm', weatherDescription: this.weatherData.weatherDescription, temperature: 27 },
      { time: '10 pm', weatherDescription: this.weatherData.weatherDescription, temperature: 26 },
      { time: '11 pm', weatherDescription: this.weatherData.weatherDescription, temperature: 25 },
    ];
  }

  setDailyForecast(): void {
    this.dailyForecast = [
      { date: new Date(), weatherDescription: this.weatherData.weatherDescription, temperature: this.weatherData.temperature },
      
    ];
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
      'lluvia ligera': 'drizzle.png'
    };
    return iconMap[description] || 'default.png';
  }
  redirectToClima2() {
    this.router.navigate(['/climaActual']);
  }

  redirectToLogIn() {
    this.router.navigate(['/login']);
  }
}

