import { TestBed } from '@angular/core/testing';

import { FormTierraService } from './form-tierra.service';

describe('FormTierraService', () => {
  let service: FormTierraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormTierraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
