import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordDto } from '../../../../common/dtos/auth/reset-password.dto';
import { Router } from '@angular/router';
import { AuthService } from '../../../../common/services/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  forgotForm: FormGroup;
  isLoading = false;
  private authService!: AuthService;
  private router!: Router;

  constructor(private fb: FormBuilder){
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  get email() { return this.forgotForm.get('email'); }
  get password() { return this.forgotForm.get('password'); }
  get confirmPassword() { return this.forgotForm.get('confirmPassword'); }

   onSubmit() {

    if (this.forgotForm.invalid) return;

    this.isLoading = true;
    const { email, password } = this.forgotForm.value;
  
    const dto: ResetPasswordDto = { email, newPassword: password };
    this.authService.resetPassword(dto).subscribe({
      next: msg => console.log('Reset success', msg),
      error: err => console.error('Reset failed', err)
    });

    setTimeout(() => {
      this.isLoading = false;
      //show toast or navigate later
    }, 1500);
}
}
