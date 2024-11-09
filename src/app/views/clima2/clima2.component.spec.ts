import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clima2Component } from './clima2.component';

describe('Clima2Component', () => {
  let component: Clima2Component;
  let fixture: ComponentFixture<Clima2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Clima2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Clima2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
