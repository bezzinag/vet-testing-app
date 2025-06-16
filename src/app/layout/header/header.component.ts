import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// HeaderComponent
// -> displays the header of the application.
// -> includes a logout button that allows users to log out of the application.

@Component(
  {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
  })

export class HeaderComponent 
{
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void 
  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}