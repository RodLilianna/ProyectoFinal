import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registroForm: FormGroup;
  tokenForm: FormGroup; // Formulario para el token
  isEmailSent = false;
  isModalVisible = false;
  errorMessage: string | null = null;
  userId: string = ''; // Almacena el ID del usuario registrado

  constructor(
    private fb: FormBuilder,
    private registroService: RegisterService,
    private router: Router
  ) {
    // Inicializa el formulario principal
    this.registroForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      selectRole: [1], // Rol predeterminado: Usuario
      isActive: [true],
      hasError: [false],
    });

    // Inicializa el formulario de token
    this.tokenForm = this.fb.group({
      token: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const userData = {
        Id: '', // El Id se establecerá una vez que el backend lo devuelva
        firstName: this.registroForm.get('firstName')?.value,
        lastName: this.registroForm.get('lastName')?.value,
        userName: this.registroForm.get('userName')?.value,
        email: this.registroForm.get('email')?.value,
        password: this.registroForm.get('password')?.value,
        confirmPassword: this.registroForm.get('confirmPassword')?.value,
        isActive: true,
        hasError: false,
        error: null,
      };

      this.registroService.register(userData).subscribe({
        next: (response) => {
          console.log('Respuesta del backend:', response);
          if (response && response.idUser) {
            this.userId = response.idUser;  // Ajusta al nombre correcto devuelto por el backend
            this.openModal();
          } else {
            console.error('No se recibió un idUser válido. Respuesta del backend:', response);
          }

          
        },
        error: (err) => {
          console.error('Error del backend:', err);
          this.errorMessage = err.error?.message || 'Ocurrió un error en el registro.';
          window.alert(this.errorMessage);
        },
      });
      
      
  }
}

confirmEmail(): void {
  if (this.tokenForm.valid) {
    const token = this.tokenForm.get('token')?.value;
    const userId = this.userId;

    if (!userId) {
      console.error('userId no disponible para la confirmación.');
      window.alert('No se pudo obtener el ID de usuario.');
      return;
    }

    this.registroService.confirmEmail(userId, token).subscribe({
      next: (response) => {
        // Muestra el mensaje según el formato recibido
        const message = response.message || 'Cuenta confirmada exitosamente.';
        window.alert(message);
        this.closeModal();
        this.router.navigate(['/registro2']);
      },
      error: (err) => {
        console.error('Error al confirmar el token:', err);
        window.alert('Error: Token inválido o expirado.');
      },
    });
  } else {
    window.alert('Por favor ingrese el token para continuar.');
  }
}



  openModal(): void {
    const modalElement = document.getElementById('tokenModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal no encontrado.');
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('tokenModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
}
