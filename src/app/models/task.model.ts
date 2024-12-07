export interface TaskViewModel {
    id: number;              // Identificador único de la tarea
    title: string;           // Título de la tarea
    description: string;     // Descripción de la tarea
    startDate: string;       // Fecha de inicio de la tarea (en formato ISO 8601)
    endDate: string;         // Fecha de fin de la tarea (en formato ISO 8601)
    isCompleted: boolean;    // Estado de la tarea (completada o no)
    priority: number;        // Prioridad de la tarea (puede ser un número que indique el nivel de prioridad)
  }
  