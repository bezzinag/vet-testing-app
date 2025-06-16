import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


// LoginComponent 
// Handles user login functionality.
@Component(
  {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })

// allowing users to log in with their email and password.
export class LoginComponent 
{
  loginForm: FormGroup;
  errorMessage = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) // constructor dependency injection for FormBuilder, AuthService, and Router

  {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
  }

  // Method for handling form submission.
  // Checks if form is valid, retrieves the email and password values,
  // Calls the login method from AuthService.
  // If the login is successfukl -> navigate to the '/tests' route.
  onSubmit(): void 
  {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    console.log('Form Submitted:', email, password);

    this.authService.login(email, password).subscribe(
      {
        next: () => {const token = this.authService.getToken();
        console.log('Stored Token:', token); // confirmation of token storage
        this.router.navigate(['/tests']);
      },

      error: (err) => 
        {
          console.error('Login error:', err);
          this.errorMessage = 'Invalid email or password';
        }
      });
  }
}
