import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';

describe('RecommendationService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
