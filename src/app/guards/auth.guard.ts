import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})

// AuthGuard notes *
// An Angular route guard that checks if a user is authenticated before allowing access to certain routes.
//  -> implements the CanActivate interface, which requires a canActivate method that returns a boolean or UrlTree.
//  -> The canActivate method checks if a token exists in the AuthService.
//  -> If a token is present, it allows access to the route; otherwise, it redirects the user to the login page.

export class AuthGuard implements CanActivate 
{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree 
  {
    const token = this.authService.getToken();
    return token ? true : this.router.parseUrl('/login');
  }
}
