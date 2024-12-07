import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { DashboardService } from '../../services/dashboard.service';  // Asegúrate de importar el servicio
import { RecomendacionViewModel } from '../../models/recomendacion.model';  // Importar el modelo de recomendación
import { AuthService } from '../../services/auth.service';  // Importar el servicio AuthService
import { CommonModule } from '@angular/common';
import { TaskViewModel } from '../../models/task.model';
import { WeatherDataViewModel } from '../../models/weather.model';  // Importar el modelo

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']  // Asegúrate de usar 'styleUrls' (con plural)
})
export class DashboardComponent implements OnInit {
  recomendaciones: RecomendacionViewModel[] = []; // Inicializar el array de recomendaciones
  sidebarOpen = false;
  tareas: TaskViewModel[] = [];  // Propiedad para almacenar las tareas
  location: string = 'Dominican Republic';  // Ubicación de ejemplo (puedes cambiarlo o hacerlo dinámico)
  weatherDescription: string = '';      // Almacenar descripción del clima (declarada como string)
  temperature: number = 0;              // Almacenar temperatura (declarada como number)
  humidity: number = 0;                 // Almacenar humedad (declarada como number)

  constructor(
    private dashboardService: DashboardService, 
    private authService: AuthService   // Inyectamos AuthService
  ) {}

  ngOnInit(): void {
    this.getWeatherData();  // Llamar al método para obtener datos del clima
    const userId = this.authService.getUserId();  // Obtener el ID del usuario desde el token
    if (userId) {
      this.getTasks();  // Obtener las tareas
      this.getRecommendations(userId);  // Obtener las recomendaciones
    } else {
      console.error('No se pudo obtener el ID del usuario.');
    }
  }
  

  // Método para obtener las recomendaciones del usuario
  getRecommendations(userId: string): void {
    this.dashboardService.getRecommendations(userId).subscribe(
      (data: RecomendacionViewModel[]) => {
        console.log('Recomendaciones obtenidas:', data);  // Verifica los datos aquí
        this.recomendaciones = data;  // Asignamos los datos a la propiedad
      },
      (error) => {
        console.error('Error al obtener las recomendaciones:', error);
      }
    );
  }

    // Obtener las tareas
    getTasks(): void {
      this.dashboardService.getTasks().subscribe(
        (data: TaskViewModel[]) => {
          console.log('Tareas obtenidas:', data);
          this.tareas = data;
        },
        (error) => {
          console.error('Error al obtener las tareas:', error);
        }
      );
    }
  // Obtener datos del clima
  getWeatherData(): void {
    this.dashboardService.getWeatherData(this.location).subscribe(
      (data: WeatherDataViewModel) => {
        this.temperature = data.temperature;              // Asignar temperatura
        this.humidity = data.humidity;                    // Asignar humedad
        this.weatherDescription = data.weatherDescription; // Asignar descripción del clima
      },
      (error) => {
        console.error('Error al obtener los datos del clima:', error);
      }
    );
  }

  // Método para alternar el estado de la barra lateral
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
