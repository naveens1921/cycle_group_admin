import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../app.component';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})
export class CalculateComponent {
  estimatedTime: { estimatedTimeInHours: number } | null = null;

  userLocation: { latitude: number; longitude: number } = { latitude: 0, longitude: 0 };
  chosenSpot: string = '';
  cyclingSpeed: number = 0;
  dailyCyclingHours: number = 0;
  accessibleMessage:string='';
  resultTime:number=0;
  timeHour:number=0;
  spotDetails: any[] = []; 
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `${token}`);
    const options = { headers };

    this.http.get(baseUrl + '/spots/getallspots', options).subscribe(
      (response: any) => {
        this.spotDetails = response;
      },
      (error) => {
        console.error('Failed to fetch spot details:', error);
      }
    );
  }

  calculateTime(): void {
    const selectedSpot = this.spotDetails.find((spot) => spot.name === this.chosenSpot);


    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `${token}`);
    const options = { headers };

    const url = baseUrl + '/spots/calculatebyaccesible';
    const requestBody = {
      userLocation: {
        latitude: this.userLocation.latitude,
        longitude: this.userLocation.longitude
      },
      chosenSpot: {
        latitude: selectedSpot.latitude,
        longitude: selectedSpot.longitude,
        accessible_by_cycling: selectedSpot.accessible_by_cycling

      },
      cyclingSpeed: this.cyclingSpeed,
      dailyCyclingHours: this.dailyCyclingHours
    };


    this.http.post<{ estimatedTimeInHours: number }>(url, requestBody, options).subscribe(
      (response:any) => {
        this.estimatedTime = response;
        this.accessibleMessage=response.message;
        this.timeHour= response?.estimatedTimeInHours;
      },
      (error) => {
        console.error('Calculation failed:', error);
        this.estimatedTime = null;
      }
    );
  }
}
