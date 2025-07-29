import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { InputField } from '../../common/components/input-field/input-field';
import { Button } from '../../common/components/button/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Login } from './features/login/login';


@NgModule({
  declarations: [
    Login
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Button,
    InputField
]
})
export class AuthModule { }
