import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { InventoryService, SaveInventoryViewModel } from './inventario.service';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap'; 
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [MenuComponent, FormsModule,CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {
  newInventory: SaveInventoryViewModel = {
    id: undefined,
    name: '',
    variety: '',
    plantingDate: '',
    harvestDate: '',
    growthPercentage: 0,
    description: '',
  };

  inventoryItems: any[] = [];
  errorMessage: string = '';
  searchTerm: string = '';

  inventoryList: SaveInventoryViewModel[] = [];
  selectedInventory: any = {};
  datePipe: any;

  constructor(private inventoryService: InventoryService, private router: Router) {}

  ngOnInit() {
    this.loadInventory();
  }

  createInventory() {
    this.inventoryService.createInventory(this.newInventory).subscribe({
      next: (response) => {
        console.log('Inventario creado:', response);
        Swal.fire('Éxito', 'Producto agregado con éxito.', 'success'); 
        this.loadInventory(); 
      },
      error: (err) => {
        console.error('Error al crear inventario:', err);
        Swal.fire('Error', 'Error al agregar el producto.', 'error'); 
      },
    });
  }
  
  loadInventory() {
    this.inventoryService.getAllInventory().subscribe({
      next: (response) => {
        this.inventoryList = response;
      },
      error: (err) => {
        console.error('Error al obtener inventarios:', err);
      },
    });
  }

  deleteInventory(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.inventoryService.deleteProduct(id).subscribe({
          next: () => {
            this.inventoryList = this.inventoryList.filter(item => item.id !== id);
            Swal.fire('¡Eliminado!', 'El inventario ha sido eliminado con éxito.', 'success');
          },
          error: (err) => {
            console.error('Error al eliminar el inventario:', err);
            Swal.fire('Error', 'Hubo un problema al eliminar el inventario.', 'error');
          },
        });
      }
    });
  }

  openEditModal(inventory: SaveInventoryViewModel): void {
    this.selectedInventory = { ...inventory }; 
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  closeEditModal(): void {
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.hide();
    }
  }

  updateInventory(): void {
    if (this.selectedInventory.id) {
      this.inventoryService.updateProduct(this.selectedInventory.id, this.selectedInventory).subscribe({
        next: (updatedInventory) => {
          const index = this.inventoryList.findIndex(item => item.id === updatedInventory.id);
          if (index !== -1) {
            this.inventoryList[index] = updatedInventory;
          }
          this.closeEditModal(); 
          Swal.fire('Actualizado', 'Inventario actualizado con éxito.', 'success');
        },
        error: (err) => {
          console.error('Error al actualizar el inventario:', err);
          Swal.fire('Error', 'Error al actualizar el inventario.', 'error');
        },
      });
    }
  }

  searchInventory() {
    if (this.searchTerm.trim()) {
      this.inventoryService.getInventoryByName(this.searchTerm).subscribe({
        next: (data) => {
          this.inventoryList = data;
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error al buscar productos:', error);
          this.errorMessage = 'No se encontraron resultados.';
          this.inventoryList = [];
        }
      });
    } else {
      // Si el término de búsqueda está vacío, recargar la lista completa
      this.loadInventory();
    }
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')!;
  }

  redirectToLogIn() {
    this.router.navigate(['/login']);
  }
}
