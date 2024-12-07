import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TareaService } from './tarea.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private apiUrl = 'http://localhost:5255/api/Task';

  private months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  private currentDate = new Date();

  constructor(private tareaService: TareaService,private http: HttpClient) {}

  getCurrentMonth(): string {
    return this.months[this.currentDate.getMonth()];
  }

  getCurrentYear(): number {
    return this.currentDate.getFullYear();
  }

  changeMonth(increment: number): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + increment);
  }

  getDaysOfMonth(): { date: Date, isCurrentMonth: boolean }[] {
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    const days: { date: Date, isCurrentMonth: boolean }[] = [];

    const prevDaysCount = firstDay.getDay();
    for (let i = 0; i < prevDaysCount; i++) {
      const prevDate = new Date(firstDay);
      prevDate.setDate(firstDay.getDate() - (prevDaysCount - i));
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i), isCurrentMonth: true });
    }

    const nextDaysCount = 42 - days.length; 
    for (let i = 1; i <= nextDaysCount; i++) {
      const nextDate = new Date(lastDay);
      nextDate.setDate(lastDay.getDate() + i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  }

  getTasks() {
    return this.tareaService.getTasks(); 
  }

  createTask(task: any) {
    return this.tareaService.createTask(task);
  }

  getTaskById(id: number) {
    return this.tareaService.getTaskById(id); 
  }

  searchTaskById(id: number): Observable<any> {
    return this.tareaService.searchTaskById(id);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); 
  }

  updateTask(task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${task.id}`, task);  
  }
}