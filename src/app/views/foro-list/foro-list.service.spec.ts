import { TestBed } from '@angular/core/testing';

import { ForoListService } from './foro-list.service';

describe('ForoListService', () => {
  let service: ForoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
