import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


// AuthResponse interface 
//  -> this defines the structure of the response from the authentication API.
//  -> includes accessToken property, -> a string representing the token returned upon successful authentication.
//  -> token is used in subsequent requests to authenticate the user and authorize access to protected resources.
//  -> The AuthService class uses this interface to ensure that the response from the login method conforms to this structure.



interface AuthResponse {accessToken: string;}

//injectable decorator
//  -> marks the AuthService class as a service that can be injected into other components or services.
@Injectable(
  {
    providedIn: 'root'
  })


export class AuthService 
{
  private readonly apiUrl = 'http://localhost:8080/api/auth'; // URL of the authentication API endpoint

  constructor(private http: HttpClient) {} // constructor dependency injection for HttpClient

  // login method
  //  -> takes an email and password as parameters.
  //  -> returns an Observable of AuthResponse.
  //         -> Waht is an Observable?
  //         -> An Observable is a stream of data that can be observed over time.
  //             -> It allows you to subscribe to changes and receive updates when new data is emitted.
  //             -> In this case, the Observable emits the response from the authentication API when the login request is successful.
      
  login(email: string, password: string): Observable<any> 
  {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(tap(response => 
      {
        console.log('[DEBUG] Raw login response:', response);
        localStorage.setItem('token', response.accessToken); // may be undefined
      }));
  }

  // getToken method
  //  -> retrieves the token from localStorage.
  //  -> returns the token as a string or null if it does not exist.
  getToken(): string | null 
  {
    return localStorage.getItem('token');
  }

  // logout method
  //  -> removes the token from localStorage.
  logout(): void 
  {
    localStorage.removeItem('token');
  }

  
  isLoggedIn(): boolean 
  {
    return !!this.getToken(); // true if token exists, false if null
  }
}
