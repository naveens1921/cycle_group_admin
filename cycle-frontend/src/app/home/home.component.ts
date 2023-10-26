import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  authenticated: boolean = false; 
  constructor( private router: Router) {}

  login() {
    this.router.navigate(['/login']);
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  goToSpotlist() {
    this.router.navigate(['/spots']);
  }

  goToCalculateTime() {
    this.router.navigate(['/calculate']);

  }
}
