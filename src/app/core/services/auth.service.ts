import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../config/environment';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<AuthResponse>(this.api, { username, password })
      .pipe(
        tap(response => {
          debugger
          this.saveAccessToken(response.accessToken);
          this.saveRefreshToken(response.refreshToken);
           console.log(localStorage.getItem('accessToken'));
        })
      );
  }

  // Access Token
  saveAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // 🔄 Refresh Token
  saveRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  // 🔍 Auth status
  isAuthenticated(): boolean {

    debugger
    const token = this.getAccessToken();

    return token !== null && token !== undefined && token !== '';
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}