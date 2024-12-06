import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title= "agrosmart"
  isMenuOpen = true;  // Inicialmente el menú está abierto (puedes cambiar a false si prefieres lo contrario)
  username = 'Usuario'; // Asegúrate de que esta variable esté definida con el nombre del usuario

  // Método para alternar el estado del menú
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}