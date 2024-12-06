import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormTierraService } from '../../services/form-tierra.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro2',
  templateUrl: './registro2.component.html',
  styleUrls: ['./registro2.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class Registro2Component implements OnInit {
  registro2Form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formTierraService: FormTierraService,
    private router: Router,
    private authService: AuthService
  ) {
    this.registro2Form = this.fb.group({
      tipoDeSuelo: ['', [Validators.required]],
      humedadTerreno: ['', [Validators.required]],
      drenaje: ['', [Validators.required]],
      luzSolar: ['', [Validators.required]],
      tipoDeRiego: ['', [Validators.required]],
      tipoDeFertilizacion: ['', [Validators.required]],
      problemasDePlagas: ['', [Validators.required]], // Convertir a booleano en el envío
      tamanoTerreno: ['', [Validators.required]],
      usuarioId: ['', Validators.required], // Se autocompleta con el token
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token no encontrado. Redirigiendo al inicio de sesión.');
      this.router.navigate(['/login']);
      return;
    }

    const usuarioId = this.authService.getUserId();
    if (usuarioId) {
      this.registro2Form.patchValue({ usuarioId });
    } else {
      console.error('No se pudo obtener el usuarioId del token.');
    }
  }

  onSubmit(): void {
    if (this.registro2Form.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    const formData = {
      ...this.registro2Form.value,
      problemasDePlagas: this.registro2Form.value.problemasDePlagas === 'true', // Convertir a booleano
    };

    this.formTierraService.createFormTierra(formData).subscribe({
      next: (response) => {
        console.log('Formulario enviado con éxito:', response);
        this.router.navigate(['/login']); // Redirige a una página de éxito
      },
      error: (err) => {
        console.error('Error al enviar el formulario:', err);
      },
    });
  }
}
