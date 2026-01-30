import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginCredentials, AuthResponse, User, RegisterCredentials } from '../models/auth';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;
    private token: string | null = null;

    login(credentials: LoginCredentials): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials);
    }

    register(userData: RegisterCredentials): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData);
    }

    setToken(token: string, user?: User): void {
        this.token = token;
        localStorage.setItem('authToken', token);
        if (user) {
            localStorage.setItem('authUser', JSON.stringify(user));
        }
    }

    getToken(): string | null {
        return this.token || localStorage.getItem('authToken');
    }

    getUser(): User | undefined {
        const userStr = localStorage.getItem('authUser');
        return userStr ? (JSON.parse(userStr) as User) : undefined;
    }

    clearToken(): void {
        this.token = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}