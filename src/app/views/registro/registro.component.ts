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
  tokenForm: FormGroup;
  isEmailSent = false;
  isModalVisible = false;
  errorMessage: string | null = null;
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private registroService: RegisterService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      selectRole: [1],
      isActive: [true],
      hasError: [false],
    });

    this.tokenForm = this.fb.group({
      token: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const userData = {
        Id: '',
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
          if (response && response.idUser) {
            this.userId = response.idUser;
            localStorage.setItem('userId', this.userId); // Guarda userId en localStorage
            this.openModal();
          } else {
            console.error('No se recibió un idUser válido. Respuesta:', response);
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
          const message = response.message || 'Cuenta confirmada exitosamente.';
          window.alert(message);
          this.closeModal();
          const storedUserId = localStorage.getItem('userId');
          if (!storedUserId) {
            console.error('El userId no está disponible en localStorage antes de redirigir.');
            window.alert('Hubo un error al procesar el usuario. Inténtalo nuevamente.');
            return;
          }
          this.router.navigate(['/registro2']);
          
        },
        error: (err) => {
          console.error('Error al confirmar el token:', err);
          const errorMsg =
            err.error?.message || 'Token inválido o expirado. Intenta nuevamente.';
          window.alert(`Error: ${errorMsg}`);
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
