import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SaveInventoryViewModel {
  id?: number; 
  name: string;
  variety: string;
  plantingDate: string; 
  harvestDate: string; 
  growthPercentage: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:5255/api/Inventory'; 

  constructor(private http: HttpClient) {}

  getAllInventory(): Observable<SaveInventoryViewModel[]> {
    return this.http.get<SaveInventoryViewModel[]>(this.apiUrl);
  }

  createInventory(inventory: SaveInventoryViewModel): Observable<SaveInventoryViewModel> {
    return this.http.post<SaveInventoryViewModel>(this.apiUrl, inventory);
    
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, updatedProduct: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedProduct);
  }

  getInventoryByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/name/${name}`);
  }
  
}