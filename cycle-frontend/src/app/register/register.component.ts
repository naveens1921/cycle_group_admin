import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { baseUrl } from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  registrationMessage: string = '';

  constructor(private http: HttpClient,private router: Router) {}

  registerUser() {
    this.router.navigate(['/signup']); 

    const userData = {
      username: this.username,
      password: this.password
    };



    this.http.post(baseUrl + '/auth/signup', userData).subscribe(
      (response: any) => {
        const token = response.token;
        this.registrationMessage = response.message;
        localStorage.setItem('token', token);
        this.router.navigate(['/spots']);
      },
      (error) => {
        console.log(error,'op');
        this.registrationMessage = error.error.message;
      }
    );
  }
}



