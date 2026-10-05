import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, map, tap } from 'rxjs';
import { API_URL } from '../config/api';
import { User } from '../models/index';
import { unwrapOne } from '../utils/http';

const TOKEN_KEY = 'token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  private _user = signal<User | null>(null);

  readonly token = this._token.asReadonly();
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._token());
  readonly auth = computed(() => (this._token() ? { headers: { Authorization: `Bearer ${this._token()}` } } : {}));

  login(body: { email: string; password: string }) {
    return this.http
      .post<{ data: { token: { token: string }; user: User } }>(`${API_URL}/auth/login`, body)
      .pipe(
        tap((res) => {
          this._token.set(res.data.token.token);
          this._user.set(res.data.user);
          localStorage.setItem('token', res.data.token.token);
        })
      );
  }

  register(body: { username: string; email: string; password: string }) {
    return this.http.post(`${API_URL}/auth/register`, body);
  }

  me() {
    return this.http.get<any>(`${API_URL}/me`).pipe(
      map((res) => (res?.user ?? unwrapOne<User>(res)) as User),
      tap((user) => this._user.set(user)),
    );
  }

  updateProfile(id: number, payload: { username: string; email: string, password: string }) {
    return this.http.put<any>(`${API_URL}/users/${id}`, payload);
  }

  logout() {
    return this.http.post(`${API_URL}/logout`, {}).pipe(
      finalize(() => {
        this._token.set(null);
        this._user.set(null);
        localStorage.removeItem(TOKEN_KEY);
      })
    );
  }

  onLogout() {
    this.logout().subscribe({
      complete: () => this.router.navigate(['/auth']),
      error: () => this.router.navigate(['/auth']),
    });
  }

  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['/auth']);
  }
}
