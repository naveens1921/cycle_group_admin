import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cycle-frontend';
  isHomePage: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAuthenticated = this.isRouteAuthenticated(event.url);
      }
    });
  }

  isRouteAuthenticated(url: string): boolean {

    return !['/login', '/register', '/'].includes(url);
  }
  logout() {

    localStorage.removeItem('token');

    this.router.navigate(['']);
  }
}

export const baseUrl = 'http://localhost:4000';
