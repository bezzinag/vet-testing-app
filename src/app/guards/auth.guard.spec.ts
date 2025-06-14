import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: spy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should allow activation if token exists', () => {
    authServiceSpy.getToken.and.returnValue('mock-token');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should redirect to login if no token', () => {
    authServiceSpy.getToken.and.returnValue(null);
    const result = guard.canActivate();
    expect(typeof result).toBe('object'); // UrlTree
  });
});
