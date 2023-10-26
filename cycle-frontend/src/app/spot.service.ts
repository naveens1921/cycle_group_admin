import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class SpotService {
  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  getSpotNames(): Observable<string[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    const options = { headers };
    
    return this.http.get<string[]>(baseUrl + '/spots/spots', options);
  }

}
