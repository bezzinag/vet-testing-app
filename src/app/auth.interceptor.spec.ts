import { TestBed } from '@angular/core/testing';
import{ HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS} from '@angular/common/http';
import { of } from 'rxjs';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './services/auth.service';

describe('AuthInterceptor', () => 
  {
    let interceptor: AuthInterceptor;
    let mockAuthService: jasmine.SpyObj<AuthService>;

    beforeEach(() => 
      {
        const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

        TestBed.configureTestingModule(
          {
            providers: 
            [
              { provide: AuthService, useValue: authServiceSpy }, 
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
              AuthInterceptor
            ]
          });

        mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
        interceptor = TestBed.inject(AuthInterceptor);
      });

    it('should be created', () => 
      {
        expect(interceptor).toBeTruthy();
      });

  it('should add Authorization header if token exists', () => 
    {
      mockAuthService.getToken.and.returnValue('test-token');

      const req = new HttpRequest('GET', '/dummy');
      const handler: HttpHandler = 
      {
        handle: (request) => 
        {
          expect(request.headers.get('Authorization')).toBe('Bearer test-token');
          return of({} as HttpEvent<any>);
        }
     };

      interceptor.intercept(req, handler).subscribe();
    });
  }
);
