import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { CalendarOptions } from '@fullcalendar/core';
import { CalendarService } from './calendar.service';
import { ChunkPipe } from './chunk.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { TareaService} from './tarea.service'; 
import { Modal } from 'bootstrap';  
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MenuComponent,ChunkPipe,CommonModule,FormsModule,DatePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  currentMonth!: string; 
  currentYear!: number; 
  currentMonthIndex!: number; 
  daysOfMonth: { date: Date, isCurrentMonth: boolean, isToday: boolean }[] = [];
  today = new Date();
  tasks: any[] = []; 
  taskIdToSearch: number | undefined; 
  selectedTask: any = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  };
  newTask = { title: '', description: '', startDate: '', endDate: '' };
  modalTitulo: string = '';
  modalMensaje: string = '';
  searchValue: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  datePipe: any;
  

  constructor(private calendarService: CalendarService,private TareaService: TareaService,private router: Router) {
    this.taskIdToSearch = 0;
  }

  ngOnInit(): void {
    this.currentMonthIndex = this.today.getMonth(); 
    this.currentYear = this.today.getFullYear(); 
    this.updateCalendar();
    this.loadTasks();
  }

  updateCalendar(): void {
    this.currentMonth = this.getMonthName(this.currentMonthIndex); 
    this.daysOfMonth = this.getDaysOfMonth();
  }

  changeMonth(increment: number): void {
    this.currentMonthIndex += increment; 
    if (this.currentMonthIndex > 11) {
      this.currentMonthIndex = 0; 
      this.currentYear++; 
    } else if (this.currentMonthIndex < 0) {
      this.currentMonthIndex = 11; 
      this.currentYear--; 
    }
    this.updateCalendar();
  }

  getDaysOfMonth(): { date: Date; isCurrentMonth: boolean; isToday: boolean; isOtherMonth: boolean }[] {
    const days: { date: Date; isCurrentMonth: boolean; isToday: boolean; isOtherMonth: boolean }[] = [];
    const today = new Date();
    
    const startDate = new Date(this.currentYear, this.currentMonthIndex, 1);
    const endDate = new Date(this.currentYear, this.currentMonthIndex + 1, 0);
  
    const startDay = startDate.getDay();
    
    const prevMonthDays = startDay === 0 ? 0 : startDay;
  
    const totalDaysInMonth = endDate.getDate();
    const endDay = endDate.getDay();
    const nextMonthDays = endDay === 6 ? 0 : 6 - endDay;
  
    const prevMonth = this.currentMonthIndex === 0 ? 11 : this.currentMonthIndex - 1; 
    const nextMonth = this.currentMonthIndex === 11 ? 0 : this.currentMonthIndex + 1; 
    
    for (let i = prevMonthDays; i > 0; i--) {
      const date = new Date(this.currentYear, prevMonth, totalDaysInMonth - i + 1);
      days.push({
        date: date,
        isCurrentMonth: false,
        isToday: false,
        isOtherMonth: true
      });
    }
  
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const date = new Date(this.currentYear, this.currentMonthIndex, day);
      days.push({
        date: date,
        isCurrentMonth: true,
        isToday:
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear(),
        isOtherMonth: false
      });
    }
  
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(this.currentYear, nextMonth, i);
      days.push({
        date: date,
        isCurrentMonth: false,
        isToday: false,
        isOtherMonth: true
      });
    }
  
    return days;
  }

  getMonthName(monthIndex: number): string {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[monthIndex];
  }

  loadTasks(): void {
    this.calendarService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  getTasksForDay(date: Date): any[] {
    return this.tasks.filter(
      (task) =>
        new Date(task.startDate).toDateString() === date.toDateString()
    );
  }

openCreateTaskModal() {
  const modal = new bootstrap.Modal(document.getElementById('createTaskModal')!);
  modal.show();
}


createTask() {
  console.log('Start Date:', this.newTask.startDate);  
  console.log('End Date:', this.newTask.endDate);      

  if (this.isValidDate(this.newTask.startDate) && this.isValidDate(this.newTask.endDate)) {
    const formattedStartDate = new Date(this.newTask.startDate).toISOString();
    const formattedEndDate = new Date(this.newTask.endDate).toISOString();

    console.log('Formatted Start Date:', formattedStartDate);
    console.log('Formatted End Date:', formattedEndDate);

    this.newTask.startDate = formattedStartDate;
    this.newTask.endDate = formattedEndDate;

    this.calendarService.createTask(this.newTask).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.newTask = { title: '', description: '', startDate: '', endDate: '' }; 
        const modalElement = document.getElementById('createTaskModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide(); 
          }
        }
      },
      error: (error) => {
        console.error('Error creando tarea:', error);
        alert('La creación de la tarea falló. Por favor, inténtalo de nuevo más tarde.');
      }
    });
  } else {
    console.error('Fechas inválidas:', this.newTask.startDate, this.newTask.endDate);
    alert('Por favor, ingresa fechas válidas para la tarea.');
    return; 
  }
}

private isValidDate(date: string): boolean {
  console.log('Validating date:', date);
  const parsedDate = new Date(date);
  console.log('Parsed Date:', parsedDate);

  return !isNaN(parsedDate.getTime());
}


searchTask() {
  console.log('Buscando tarea con ID:', this.taskIdToSearch);
  if (this.taskIdToSearch !== undefined && this.taskIdToSearch > 0) {
    this.calendarService.searchTaskById(this.taskIdToSearch).subscribe({
      next: (task: Task) => {
        console.log('Tarea encontrada:', task);
        this.selectedTask = task;
      },
      error: (error: any) => {
        console.error('Error al buscar tarea:', error);
        alert('Tarea no encontrada.');
      },
    });
  } else {
    alert('Por favor, ingresa un ID válido.');
  }
}


openTaskDetailsModal(taskId: number) {
  this.calendarService.getTaskById(taskId).subscribe((task) => {
    this.selectedTask = task;
    const modal = new bootstrap.Modal(document.getElementById('taskDetailsModal')!);
    modal.show();
  });
}

openListTasksModal() {
  const modal = new bootstrap.Modal(document.getElementById('listTasksModal')!);
  modal.show();
}

buscarTareaPorNombre(valor: string): void {
  console.log(`Buscando tarea con nombre: ${valor}`);

  const tarea = this.tasks.find(task => task.title.toLowerCase() === valor.toLowerCase());

  if (tarea) {
    console.log('Tarea encontrada:', tarea);

    this.calendarService.getTaskById(tarea.id).subscribe({
      next: (task) => {
        console.log('Tarea obtenida del backend:', task);
        this.selectedTask = task;
        this.enfocarTareaEnCalendario(task.id);
        this.mostrarModalDetalles(); 
      },
      error: (error) => {
        console.error('Error al obtener la tarea del servidor:', error);
        this.mostrarModalMensaje('Error', 'No se pudo obtener la tarea del servidor.');
      }
    });
  } else {
    this.mostrarModalMensaje('Error', 'No se encontró ninguna tarea con ese nombre.');
  }
}

mostrarModalMensaje(titulo: string, mensaje: string): void {
  this.modalTitulo = titulo;
  this.modalMensaje = mensaje;

  const modalElement = document.getElementById('messageModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}

mostrarModalDetalles(): void {
  const modalElement = document.getElementById('taskDetailsModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}

enfocarTareaEnCalendario(tareaId: number): void {
  const tareaElemento = document.getElementById(`tarea-${tareaId}`);
  if (tareaElemento) {
    tareaElemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
    tareaElemento.classList.add('resaltar'); // Agrega un estilo temporal para resaltar
    setTimeout(() => tareaElemento.classList.remove('resaltar'), 3000);
  }
}

deleteTask(): void {
  if (this.selectedTask && this.selectedTask.id) {
    this.calendarService.deleteTask(this.selectedTask.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== this.selectedTask.id);
        this.selectedTask = null;
        const modalElement = document.getElementById('taskDetailsModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
        Swal.fire('Eliminada', 'La tarea ha sido eliminada correctamente', 'success');
      },
      error: (error) => {
        console.error('Error al eliminar tarea:', error);
        Swal.fire('Error', 'No se pudo eliminar la tarea. Intenta de nuevo.', 'error');
      }
    });
  }
}

openEditModal(): void {
  setTimeout(() => {
    const modalElement = document.getElementById('editTaskModal');
    if (modalElement) {
      const editModal = new bootstrap.Modal(modalElement);
      editModal.show();
    } else {
      console.error('No se encontró el modal con el ID "editTaskModal".');
    }
  });
}


confirmDelete(): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta tarea será eliminada permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteTask();
    }
  });
}

formatDate(date: string): string {
  return this.datePipe.transform(date, 'dd/MM/yyyy')!;
}


closeEditModal(): void {
  const modalElement = document.getElementById('editTaskModal');
  if (modalElement) {
    const modal = new Modal(modalElement);
    modal.hide();  
  }
}

updateTask(): void {
  if (this.selectedTask.id) {
    this.TareaService.updateTask(this.selectedTask.id, this.selectedTask).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask; 
        }
        this.closeEditModal();  
        Swal.fire('Actualizado', 'Tarea actualizada con éxito.', 'success');
      },
      error: (err) => {
        console.error('Error al actualizar la tarea:', err);
        Swal.fire('Error', 'Error al actualizar la tarea.', 'error');
      }
    });
  }
}

redirectToLogIn() {
  this.router.navigate(['/login']);
}
}

interface Task {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}