import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormTierraService } from '../../services/form-tierra.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro2',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro2.component.html',
  styleUrls: ['./registro2.component.css'],
})
export class Registro2Component implements OnInit {
  registro2Form: FormGroup;

  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private formTierraService: FormTierraService,
    private router: Router
  ) {
    this.registro2Form = this.fb.group({
      tipoDeSuelo: ['', Validators.required],
      humedadTerreno: ['', Validators.required],
      drenaje: ['', Validators.required],
      luzSolar: ['', Validators.required],
      tipoDeRiego: ['', Validators.required],
      tipoDeFertilizacion: ['', Validators.required],
      plagas: ['', Validators.required],
      tamanoTerreno: ['', Validators.required],
    });
  }

  ngOnInit() {
    const userIdFromStorage = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken'); // Verificar si el token está disponible
  
    console.log('userId:', userIdFromStorage);
    console.log('authToken:', authToken);
  
    if (userIdFromStorage) {
      this.userId = userIdFromStorage;
    } else {
      console.error('No se encontró userId en localStorage. Redirigiendo al login.');
      this.router.navigate(['/login']);
    }
  }
  
  onSubmit() {
    if (this.registro2Form.invalid || !this.userId) {
      window.alert('Por favor, ingrese todos los campos correctamente.');
      return;
    }
  
    const formData = { 
      ...this.registro2Form.value, 
      usuarioId: this.userId // Incluye el usuarioId directamente
    };
  
    console.log('Request body enviado:', formData); // Log para depuración
  
    this.formTierraService.saveFormData(formData).subscribe(
      (response) => {
        console.log('Datos guardados exitosamente:', response);
        this.router.navigate(['/login']); // Cambia la navegación si es necesario
      },
      (error) => {
        console.error('Error al guardar los datos:', error);
        window.alert('Ocurrió un error al guardar el formulario. Inténtalo nuevamente.');
      }
    );
  }
  
  
}
