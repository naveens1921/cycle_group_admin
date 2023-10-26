// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { baseUrl } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = !!localStorage.getItem('token');
  }

  login(username: string, password: string): void {
    const userData = {
      username,
      password
    };

    this.http.post(baseUrl + ' /auth/login', userData).subscribe(
      (response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);

        this.isAuthenticated = true;

        this.router.navigate(['/spots']);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }

  register(username: string, password: string): void {
    const userData = {
      username,
      password
    };

    this.http.post(baseUrl + ' /auth/register', userData).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;

    this.router.navigate(['/login']);
  }
}
