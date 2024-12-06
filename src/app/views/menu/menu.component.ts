import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isMenuOpen: boolean = true; 
  username: string = 'Invitado'; // Valor por defecto
  userId: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  loadUserDetails() {
    this.userId = this.authService.getUserId();
    if (this.userId) {
      this.authService.getUserDetails(this.userId).subscribe(
        (userDetails) => {
          // Asumiendo que el backend devuelve un objeto con los campos "firstName" y "lastName"
          this.username = `${userDetails.firstName} ${userDetails.lastName}` || 'Usuario';
        },
        (error) => {
          console.error('Error al obtener los detalles del usuario:', error);
          this.username = 'Invitado'; // Valor por defecto si hay un error
        }
      );
    } else {
      this.username = 'Invitado'; // Valor por defecto si no hay userId
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirigir al login
  }
}