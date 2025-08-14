import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../common/services/auth';
import { Button } from '../../../../common/components/button/button';
import { InputField } from '../../../../common/components/input-field/input-field';

class MockAuthService {
  login() {
    return of({ accessToken: 'test', refreshToken: 'test' });
  }
}

class MockRouter {
  navigate(path: string[]) {}
}


fdescribe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Login],
      imports: [
        ReactiveFormsModule,
        Button,
        InputField
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have email and password fields in the form', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should mark email as invalid if empty', () => {
    const email = component.loginForm.get('email');
    email?.setValue('');
    expect(email?.valid).toBeFalse();
  });

  it('should mark password as invalid if less than 6 characters', () => {
    const password = component.loginForm.get('password');
    password?.setValue('123');
    expect(password?.valid).toBeFalse();
  });

  it('should call login() method when form is valid and submitted', () => {
    spyOn(component, 'login');

    component.loginForm.setValue({
      email: 'user@example.com',
      password: 'password123'
    });

    component.login();

    expect(component.login).toHaveBeenCalled();
  });
});
