export interface InventoryItem {
    id: number;
    name: string;
    variety: string;
    plantingDate: string;
    harvestDate: string;
    growthPercentage: number;
    description: string;
    quantity: number;  // Agregar la cantidad de cada insumo
  }
  