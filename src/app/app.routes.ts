import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './views/registro/registro.component';
import { InventarioComponent } from './views/inventario/inventario.component';
import { Clima2Component } from './views/clima2/clima2.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { Registro2Component } from './views/registro2/registro2.component';
import { LogInComponent } from './views/log-in/log-in.component';
import { ForoListComponent } from './views/foro-list/foro-list.component';
import { ForoDetailComponent } from './views/foro-detail/foro-detail.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NewsComponent } from './views/news/news.component';
import { NewsDetailComponent } from './views/news-detail/news-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'clima', loadComponent: () => import('./views/climate-sect/climate-sect.component').then(m => m.ClimateSectComponent) },
  { path: 'climaActual', loadComponent: () => import('./views/clima2/clima2.component').then(m => m.Clima2Component) }, 
  // { path: 'climaActual', component: Clima2Component },
  { path: 'calendario', component: CalendarComponent },
  { path: 'registro2', component: Registro2Component },
  { path: 'login', component: LogInComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'foro', component: ForoListComponent },
  { path: 'foro/:id', component: ForoDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'informaciones', component: NewsComponent},
  { path: 'informaciones/:id', component: NewsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule,FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }


