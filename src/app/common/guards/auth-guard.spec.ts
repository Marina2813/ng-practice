import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { AuthService } from '../services/auth';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: { isLoggedIn: () => true }
        }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);

    const route: any = {};
    const state: any = {};

    const result = guard.canActivate(route, state);
    expect(result).toBeTrue();
  });

  it('should deny access if user is not logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);

    const route: any = {};
    const state: any = {};

    const result = guard.canActivate(route, state);
    expect(result).toBeFalse();
  });
});

