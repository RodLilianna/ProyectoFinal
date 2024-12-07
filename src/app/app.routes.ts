import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './views/registro/registro.component';
import { InventarioComponent } from './views/inventario/inventario.component';
import { ClimateSectComponent } from './views/climate-sect/climate-sect.component';
import { Clima2Component} from './views/clima2/clima2.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { Registro2Component} from './views/registro2/registro2.component';
import { LogInComponent } from './views/log-in/log-in.component';
import { ForoListComponent } from './views/foro-list/foro-list.component';
import { ForoDetailComponent } from './views/foro-detail/foro-detail.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NewsComponent } from './views/news/news.component';
import { NewsDetailComponent } from './views/news-detail/news-detail.component';
import { AuthGuard } from './auth/auth.guard';  // Asegúrate de importar el AuthGuard

export const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'registro2', component: Registro2Component },
  { path: 'login', component: LogInComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Rutas protegidas con AuthGuard
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'inventario', 
    component: InventarioComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'clima', 
    component: ClimateSectComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'climaActual', 
    component: Clima2Component, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'calendario', 
    component: CalendarComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'foro', 
    component: ForoListComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'foro/:id', 
    component: ForoDetailComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'informaciones', 
    component: NewsComponent, 
    canActivate: [AuthGuard] 
  },
  {
    path: 'informaciones-detail',
    component: NewsDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
