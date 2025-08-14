import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: any, state: any): boolean {
    if (localStorage.getItem('accessToken')) return true;
    this.router.navigate(['/auth/login']);
    return false;
  }
}
