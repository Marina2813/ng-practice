import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['me@example.com', [Validators.email, Validators.required, Validators.minLength(6)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  login(){
    console.log(this.loginForm); 
  }
}
