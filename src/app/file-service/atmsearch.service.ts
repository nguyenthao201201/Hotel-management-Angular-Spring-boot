import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtmSearchService {

  private apiUrl = `${environment.apiBaseUrl}/api/atm/search`;  

  constructor(private http: HttpClient) {}

  getAtm(atmData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
     
    });

    return this.http.post<any>(this.apiUrl, atmData, { headers });
  }
}