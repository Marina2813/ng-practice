import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthResultDto } from '../dtos/auth/auth-result.dto';
import { LoginDto } from '../dtos/auth/login.dto';
import { RegisterDto } from '../dtos/auth/register.dto';
import { AuthResponseDto } from '../dtos/auth/auth-response.dto';
import { ResetPasswordDto } from '../dtos/auth/reset-password.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private base = `${environment.apiUrl}/v1/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  register(dto: RegisterDto) {
    return this.http.post<string>(`${this.base}/register`, dto);
  }
  login(dto: LoginDto): Observable<AuthResponseDto> {
    return this.http.post<{result: AuthResponseDto}>(`${this.base}/login`, dto).pipe(
    map(response => response.result)
  );
  }
  resetPassword(dto: ResetPasswordDto) {
    return this.http.post<string>(`${this.base}/reset-password`, dto);
  }
  refreshToken(refreshToken: string) {
    return this.http.post<AuthResponseDto>(`${this.base}/refresh-token`, { refreshToken });
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/auth/login']);
  }

  getCurrentUser(): { userId: string; username: string } | null {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
       console.log('Decoded JWT Payload:', payload);  
      return {
        userId: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        username: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      };
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  }


}
