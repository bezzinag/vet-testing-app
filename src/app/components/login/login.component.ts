import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() 
  {
  if (this.loginForm.invalid) return;

  const { email, password } = this.loginForm.value;
  console.log('Form Submitted:', email, password); // 👈 ADD THIS

  this.authService.login(email, password).subscribe({
    next: () => this.router.navigate(['/tests']),
    error: (err) => {
      console.error('Login error:', err); // 👈 ADD THIS
      this.errorMessage = 'Invalid email or password';
    }
  });
}
}