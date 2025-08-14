import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { ForgotPassword } from './features/forgot-password/forgot-password';
import { AuthLayout } from './shared/components/auth-layout/auth-layout';

const routes: Routes = [
  {
      path: '',
      component: AuthLayout,
      children: [
        { path: 'login', component: Login},
        { path: 'register', component: Register},
        { path: 'forgot-password', component: ForgotPassword},
      ]
    }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
