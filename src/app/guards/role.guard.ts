import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable(
  {
    providedIn: 'root'
  })

export class RoleGuard implements CanActivate {constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree 
  {
    const expectedRoles: string[] = route.data['expectedRole'];
    const token = this.authService.getToken();

    if (!token) 
      {
        console.warn('[RoleGuard] No token found');
        return this.router.parseUrl('/login');
      }

    try 
    {
      const decoded: any = jwtDecode(token);
      const userRole: string = decoded.roles;

      console.log('[RoleGuard] token =', token);
      console.log('[RoleGuard] decoded =', decoded);
      console.log('[RoleGuard] expected =', expectedRoles, 'actual =', userRole);

      if (expectedRoles.includes(userRole)) 
        {
          return true;
        }

      console.warn('[RoleGuard] Access denied: Role mismatch');
      return this.router.parseUrl('/login');
    } 
    catch (err) 
    {
      console.error('[RoleGuard] JWT decoding failed:', err);
      return this.router.parseUrl('/login');
    }
  }
}
