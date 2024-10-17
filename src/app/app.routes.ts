import { Routes } from '@angular/router';
import { LogInComponent } from './views/log-in/log-in.component';
import { ForoListComponent } from './views/foro-list/foro-list.component';
import { ForoDetailComponent } from './views/foro-detail/foro-detail.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'foro', component: ForoListComponent },
    { path: 'foro/:id', component: ForoDetailComponent },
    { path: 'dashboard', component: DashboardComponent },

  ];
