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
      tipoDeSuelo: ['', [Validators.required, Validators.maxLength(100)]],
      humedadTerreno: ['', [Validators.required, Validators.maxLength(100)]],
      drenaje: ['', [Validators.required, Validators.maxLength(100)]],
      luzSolar: ['', [Validators.required, Validators.maxLength(100)]],
      tipoDeRiego: ['', [Validators.required, Validators.maxLength(100)]],
      tipoDeFertilizacion: ['', [Validators.required, Validators.maxLength(100)]],
      plagas: ['', Validators.required], 
      tamanoTerreno: ['', [Validators.required, Validators.pattern(/^(Menos de 1 ha|1-5 ha|5-10 ha|Más de 10 ha)$/)]], 
    });
  }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');
   
    console.log('userId:', userId); // Verifica que 'userId' esté correcto
    console.log('authToken:', authToken); // Verifica que 'authToken' esté correcto
  
    if (userId && authToken) {
      this.userId = userId;
    } else {
      console.error('Faltan userId o authToken.');
      window.alert('No se ha encontrado información de sesión.');
    }
  }
  

  onSubmit() {
    console.log(this.registro2Form.valid); // Ver si el formulario es válido
    console.log(this.registro2Form.errors); // Ver errores generales del formulario
  
    // Revisar cada control del formulario
    Object.keys(this.registro2Form.controls).forEach(controlName => {
      const control = this.registro2Form.get(controlName);
      console.log(`${controlName} isValid: ${control?.valid}, Errors:`, control?.errors);
    });
  
    if (this.registro2Form.invalid || !this.userId) {
      window.alert('Por favor, ingrese todos los campos correctamente.');
      return;
    }

    // Convertir 'tamanoTerreno' a un valor numérico según el rango seleccionado
    let tamanoTerrenoNum: number;

    switch (this.registro2Form.value.tamanoTerreno) {
      case 'Menos de 1 ha':
        tamanoTerrenoNum = 0;  // Se puede ajustar según la lógica de negocio
        break;
      case '1-5 ha':
        tamanoTerrenoNum = 3;  // Puedes usar el valor medio
        break;
      case '5-10 ha':
        tamanoTerrenoNum = 7;  // También puedes elegir el valor medio
        break;
      case 'Más de 10 ha':
        tamanoTerrenoNum = 11; // Valor arbitrario para 'más de 10 ha'
        break;
      default:
        tamanoTerrenoNum = 0; // Valor por defecto
    }

    const formData = { 
      id: 0, // Se genera en el backend
      ...this.registro2Form.value, 
      usuarioId: this.userId,
      tamanoTerreno: tamanoTerrenoNum // Valor numérico
    };
  
    console.log('Request body enviado:', formData); // Depuración
  
    this.formTierraService.sendFormData(formData).subscribe(
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
