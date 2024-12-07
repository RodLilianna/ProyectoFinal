import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { DashboardService } from '../../services/dashboard.service'; 
import { RecomendacionViewModel } from '../../models/recomendacion.model'; 
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';
import { TaskViewModel } from '../../models/task.model';
import { WeatherDataViewModel } from '../../models/weather.model'; 
import { InventoryItem } from '../../models/inventory.model'; 
import { Chart, registerables, LinearScale, CategoryScale, BarElement } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  recomendaciones: RecomendacionViewModel[] = []; 
  sidebarOpen = false;
  tareas: TaskViewModel[] = [];  
  location: string = 'Dominican Republic';  
  weatherDescription: string = '';      
  temperature: number = 0;              
  humidity: number = 0;                 
  inventoryData: InventoryItem[] = [];  
  inventoryChart: Chart | undefined; 
  riskChart: Chart | undefined;
  weatherData: WeatherDataViewModel[] = [];  
  precipitationData: number[] = [];  // Declaración de precipitación
  riskData: number[] = [];  // Declaración de riesgo
  toggleSideBar = false;

  constructor(
    private dashboardService: DashboardService, 
    private authService: AuthService   
  ) {}

  calculateRisk(chance: number): number {
    if (chance < 30) {
      return 1;  // Bajo riesgo
    } else if (chance >= 30 && chance < 70) {
      return 2;  // Riesgo medio
    } else {
      return 3;  // Alto riesgo
    }
  }
  calculateRiskForPrecipitation() {
    this.riskData = this.precipitationData.map(chance => this.calculateRisk(chance));
    console.log(this.riskData);  // Muestra los resultados en la consola para verificarlos
  }
  
  ngOnInit(): void {
    this.getInventoryData();  
    this.getWeatherData();
    this.getWeatherDataForChart();  // Obtener los datos para el gráfico
    const userId = this.authService.getUserId();  
    if (userId) {
      this.getTasks();  
      this.getRecommendations(userId);  
    } else {
      console.error('No se pudo obtener el ID del usuario.');
    }
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createInventoryChart();
      this.createPrecipitationChart();  // Crear el gráfico después de obtener los datos
    });
  }

  getRecommendations(userId: string): void {
    this.dashboardService.getRecommendations(userId).subscribe(
      (data: RecomendacionViewModel[]) => {
        this.recomendaciones = data;  
      },
      (error) => {
        console.error('Error al obtener las recomendaciones:', error);
      }
    );
  }

  getTasks(): void {
    this.dashboardService.getTasks().subscribe(
      (data: TaskViewModel[]) => {
        this.tareas = data;
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
      }
    );
  }
  // Método para obtener los datos del clima
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

  // Método para obtener los datos de precipitación y procesarlos para el gráfico
  getWeatherDataForChart(): void {
    this.dashboardService.getWeatherData(this.location).subscribe(
      (data: WeatherDataViewModel) => {
        console.log('Datos recibidos de la API:', data);  // Verifica que se reciban los datos correctamente
  
        this.weatherData = [data];  // Asegúrate de que los datos estén en un arreglo
  
        if (this.weatherData && this.weatherData.length > 0) {
          const firstItem = this.weatherData[0];
          console.log('Primer elemento de los datos:', firstItem);
  
          // Verificamos si la temperatura y humedad están disponibles
          if (firstItem.temperature && firstItem.humidity) {
            const temperature = firstItem.temperature;  // Temperatura en grados (puede ser en °C o °F)
            const humidity = firstItem.humidity;  // Humedad en porcentaje (0 - 100)
  
            // Calculamos una estimación de la probabilidad de precipitación basada en temperatura y humedad
            const precipitationChance = this.calculatePrecipitationFromTempAndHumidity(temperature, humidity);
            console.log('Probabilidad estimada de precipitación:', precipitationChance);
  
            this.precipitationData = [precipitationChance];
  
            // Calcular el riesgo a partir de la probabilidad de precipitación
            this.riskData = this.precipitationData.map(chance => this.calculateRisk(chance));
            console.log('Datos de riesgo:', this.riskData);
  
          } else {
            console.log('No se encontraron datos de temperatura o humedad');
            this.precipitationData = [];
            this.riskData = [];
          }
        } else {
          console.log('No se recibieron datos de la API');
          this.precipitationData = [];
          this.riskData = [];
        }
  
        // Llamar a la función para crear el gráfico
        this.createPrecipitationChart();  
      },
      (error) => {
        console.error('Error al obtener los datos del clima para gráfico:', error);
      }
    );
  }
  
  // Función para estimar la probabilidad de precipitación a partir de la temperatura y humedad
  calculatePrecipitationFromTempAndHumidity(temperature: number, humidity: number): number {
    // Lógica ficticia para calcular la probabilidad de precipitación
    let precipitationChance = 0;
  
    // Si la temperatura es mayor a 30 grados y la humedad es mayor a 60%, hay mayor probabilidad de precipitación
    if (temperature > 30 && humidity > 60) {
      precipitationChance = 80;  // Alta probabilidad de precipitación
    }
    // Si la temperatura está entre 20 y 30 grados y la humedad es media, probabilidad moderada
    else if (temperature >= 20 && temperature <= 30 && humidity >= 40 && humidity <= 60) {
      precipitationChance = 50;  // Probabilidad moderada
    }
    // Si la temperatura es baja o la humedad es baja, la probabilidad de precipitación es baja
    else {
      precipitationChance = 20;  // Baja probabilidad de precipitación
    }
  
    return precipitationChance;
  }
  
  
  getInventoryData(): void {
    this.dashboardService.getInventoryData().subscribe(
      (data: InventoryItem[]) => {
        this.inventoryData = data;
        this.createInventoryChart();  
      },
      (error) => {
        console.error('Error al obtener los datos del inventario:', error);
      }
    );
  }

  createInventoryChart(): void {
    const ctx = document.getElementById('inventoryChart') as HTMLCanvasElement;
  
    if (this.inventoryChart) {
      this.inventoryChart.destroy();
    }
  
    const inventoryLabels = this.inventoryData.map(item => item.name);
    const inventoryValues = this.inventoryData.map(item => item.growthPercentage);
  
    this.inventoryChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: inventoryLabels,
        datasets: [{
          label: 'Porcentaje de Crecimiento',
          data: inventoryValues,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createPrecipitationChart(): void {
    const ctx = document.getElementById('precipitationChart') as HTMLCanvasElement;
  
    if (this.precipitationData && this.precipitationData.length > 0 && this.riskData && this.riskData.length > 0) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Riesgo de Precipitación'],
          datasets: [
            {
              label: 'Probabilidad de Precipitación (%)',
              data: this.precipitationData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 1
            },
            {
              label: 'Riesgo Estimado',
              data: this.riskData,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              suggestedMin: 0,   // Usa `suggestedMin` en lugar de `min`
              suggestedMax: 100  // Usa `suggestedMax` en lugar de `max`
            }
          },
          plugins: {
            tooltip: {
              enabled: true
            }
          }
        }
      });
    } else {
      console.log('Datos insuficientes para crear el gráfico');
    }
  }
  
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
