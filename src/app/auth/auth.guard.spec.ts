import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service'; // Importa tu servicio de autenticación
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is authenticated', (done) => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
  
    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBeTrue();
      done();
    });
  });
  
  it('should redirect to login if user is not authenticated', (done) => {
    authServiceSpy.isAuthenticated.and.returnValue(false);
  
    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
  
});
