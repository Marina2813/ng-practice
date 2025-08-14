import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDto } from '../../../../common/dtos/auth/login.dto';
import { AuthService } from '../../../../common/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false, 
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const dto: LoginDto = this.loginForm.value;

    this.authService.login(dto).subscribe({
      next: res => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.router.navigate(['/home']);
        this.isLoading = false; 
      },
      error: err => {
        console.error('Login failed', err);
        this.errorMessage = err?.error?.message || 'Login failed. Please try again.';
        this.isLoading = false; 
      }
    });
  }

  togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}
}
