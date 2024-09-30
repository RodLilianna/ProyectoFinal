import { Routes } from '@angular/router';
import { LogInComponent } from './views/log-in/log-in.component';

export const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' } 
  ];
