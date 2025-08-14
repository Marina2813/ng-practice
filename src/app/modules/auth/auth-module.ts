import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { InputField } from '../../common/components/input-field/input-field';
import { Button } from '../../common/components/button/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Navbar } from "../../common/components/navbar/navbar";
import { ForgotPassword } from './features/forgot-password/forgot-password';
import { AuthLayout } from './shared/components/auth-layout/auth-layout';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    Login,
    Register,
    ForgotPassword,
    AuthLayout
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Button,
    InputField,
    Navbar,
  ],
  
})
export class AuthModule { }
