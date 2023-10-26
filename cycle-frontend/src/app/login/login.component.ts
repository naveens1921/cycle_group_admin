import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { baseUrl } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authSerivce: AuthService
  ) { }

  login() {
  
    const userData = {
      username: this.username,
      password: this.password
    };
    this.http.post(baseUrl + '/auth/login', userData).subscribe(
      (response: any) => {
        const token = response.token;
        this.loginMessage = response.message;
        localStorage.setItem('token', token);
        this.authSerivce.isAuthenticated = true
        this.router.navigate(['/spots']);
      },
      (error) => {
        this.loginMessage = error.error.message;
      }
    );
  }
}
