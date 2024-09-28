import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateSectComponent } from './climate-sect.component';

describe('ClimateSectComponent', () => {
  let component: ClimateSectComponent;
  let fixture: ComponentFixture<ClimateSectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClimateSectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimateSectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
