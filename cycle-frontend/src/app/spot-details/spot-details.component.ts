import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-spot-details',
  templateUrl: './spot-details.component.html',
  styleUrls: ['./spot-details.component.css']
})
export class SpotDetailsComponent implements OnInit {
  spotName: string;
  spotDetails: any;

  constructor(private route: ActivatedRoute,private router:Router, private http: HttpClient) {
    this.spotName = this.route.snapshot.params['name'];
  }

  navigateToSpotList(){
    this.router.navigate(['/spots']);

  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `${token}`
    };

    this.http.get<any>(`http://localhost:4000/spots/spotname/${this.spotName}`, { headers })
      .subscribe(
        (response) => {
          this.spotDetails = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
