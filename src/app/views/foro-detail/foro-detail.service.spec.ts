import { TestBed } from '@angular/core/testing';

import { ForoDetailService } from './foro-detail.service';

describe('ForoDetailService', () => {
  let service: ForoDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForoDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
