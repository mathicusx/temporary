import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  // Authenticate the user and store the token on success
  login(username: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${environment.apiURL}/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          this.setToken(response.token);
        }),
        catchError((error) => {
          console.error('Login failed:', error);

          return throwError(() => new Error('Login failed. Please try again.'));
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
