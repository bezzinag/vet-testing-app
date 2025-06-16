import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()

//interceptor
// -> like this every HTTP request automatically includes the JWT token in the headers 
// ie. —> enabling secure, authenticated communication with the backend.
export class AuthInterceptor implements HttpInterceptor 
{
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    const token = this.authService.getToken();

    if (token) 
      {
        const authReq = req.clone({setHeaders: 
          {
            Authorization: `Bearer ${token}` // Ensures backend expects correct format
          }});

        return next.handle(authReq);
      }

    // No token found, proceed without modifying request
    return next.handle(req);
  }
}
