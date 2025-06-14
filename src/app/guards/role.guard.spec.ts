import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RoleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const mockRoute = new ActivatedRouteSnapshot();
  mockRoute.data = { expectedRole: 'CLERK' };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: spy }
      ]
    });

    guard = TestBed.inject(RoleGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should allow access if role matches', () => {
    const payload = { role: 'CLERK' };
    const token = `header.${btoa(JSON.stringify(payload))}.signature`;
    authServiceSpy.getToken.and.returnValue(token);

    expect(guard.canActivate(mockRoute)).toBeTrue();
  });

  it('should redirect if role does not match', () => {
    const payload = { role: 'VET' };
    const token = `header.${btoa(JSON.stringify(payload))}.signature`;
    authServiceSpy.getToken.and.returnValue(token);

    const result = guard.canActivate(mockRoute);
    expect(typeof result).toBe('object'); // UrlTree to /login
  });

  it('should redirect if token is missing', () => {
    authServiceSpy.getToken.and.returnValue(null);
    const result = guard.canActivate(mockRoute);
    expect(typeof result).toBe('object'); // UrlTree to /login
  });
});
