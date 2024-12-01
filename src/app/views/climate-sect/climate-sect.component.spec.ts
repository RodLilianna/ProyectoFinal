import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClimateSectComponent } from './climate-sect.component';
import { WeatherService } from './weather.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClimateSectComponent', () => {
  let component: ClimateSectComponent;
  let fixture: ComponentFixture<ClimateSectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClimateSectComponent, HttpClientTestingModule], 
      providers: [WeatherService]
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