import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotService } from '../spot.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-spot-list',
  templateUrl: './spot-list.component.html',
  styleUrls: ['./spot-list.component.css']
})
export class SpotListComponent implements OnInit {
  spotNames: string[] = [];

  constructor(
    private spotService: SpotService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.spotService.getSpotNames().subscribe((names: string[]) => {
      this.spotNames = names;
    });
  }

  showSpotDetails(spotName: string): void {
    this.router.navigate(['/spotsdetails/', spotName]);
  }
  logout(): void {
    this.authService.isAuthenticated = false
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
