export interface WeatherDataViewModel {
    date: string;               // Fecha
    location: string;           // Ubicación
    country: string;            // País
    temperature: number;        // Temperatura actual
    minTemperature: number;     // Temperatura mínima
    maxTemperature: number;     // Temperatura máxima
    weatherDescription: string; // Descripción del clima
    humidity: number;           // Humedad
    windSpeed: number;          // Velocidad del viento
    windDirection: number;      // Dirección del viento
    precipitationChance: number; // Probabilidad de precipitación
    sunrise: string;            // Hora del amanecer
    sunset: string;             // Hora del atardecer
  }
  