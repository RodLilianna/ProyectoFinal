import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/login-credentials.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LogInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  // Recuperar Contraseña
  forgotPasswordEmail: string = '';
  forgotMessage: string | null = null;

  // Restablecer Contraseña
  resetToken: string = '';
  resetPassword: string = '';
  resetConfirmPassword: string = '';
  resetMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  // Iniciar sesión
  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    const credentials: LoginCredentials = {
      Email: this.email,
      Password: this.password,
      Error: ''
    };

    this.authService.authenticate(credentials).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Credenciales incorrectas. Intente nuevamente.';
      },
    });
  }

  // Recuperar contraseña
  onForgotPassword(): void {
    if (!this.forgotPasswordEmail) {
      this.forgotMessage = 'Ingrese su correo electrónico.';
      return;
    }

    this.authService.forgotPassword(this.forgotPasswordEmail).subscribe({
      next: (response) => {
        if (response.hasError) {
          this.forgotMessage = response.error;
        } else {
          this.forgotMessage = 'Correo enviado. Revise su bandeja de entrada.';
          this.closeModal('forgotPasswordModal');
          this.openModal('resetPasswordModal');
        }
      },
      error: () => {
        this.forgotMessage = 'Error al enviar el correo. Intente de nuevo.';
      },
    });
  }

// Restablecer Contraseña
onResetPassword(): void {
  if (!this.resetToken || !this.resetPassword || !this.resetConfirmPassword) {
    this.resetMessage = 'Complete todos los campos.';
    return;
  }

  if (this.resetPassword !== this.resetConfirmPassword) {
    this.resetMessage = 'Las contraseñas no coinciden.';
    return;
  }

  const payload = {
    email: this.forgotPasswordEmail,
    password: this.resetPassword,
    confirmPassword: this.resetConfirmPassword,
    token: this.resetToken,
  };

  this.authService.resetPassword(payload).subscribe({
    next: (response) => {
      if (response.hasError) {
        this.resetMessage = response.error;
      } else {
        this.resetMessage = 'Contraseña restablecida exitosamente.';
        // Cierra el modal al completar
        const resetPasswordModal = document.getElementById('resetPasswordModal');
        if (resetPasswordModal) {
          const modalInstance =
            bootstrap.Modal.getInstance(resetPasswordModal) ||
            new bootstrap.Modal(resetPasswordModal);
          modalInstance.hide();
        }
      }
    },
    error: () => {
      this.resetMessage = 'Error al restablecer la contraseña. Inténtelo de nuevo.';
    },
  });
}


  // Abrir modal
  openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Cerrar modal
  closeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
  }

  getUserId(): string {
    const userId = localStorage.getItem('userId');
    return userId || ''; 
  }
}
