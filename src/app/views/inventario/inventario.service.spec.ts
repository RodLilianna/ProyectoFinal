import { TestBed } from '@angular/core/testing';

import { InventoryService } from './inventario.service';

describe('InventarioService', () => {
  let service: InventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
