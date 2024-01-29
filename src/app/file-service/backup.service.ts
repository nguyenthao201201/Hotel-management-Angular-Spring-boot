import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  private apiUrl = `${environment.apiBaseUrl}/admin/backup/perform`;  

  constructor(private http: HttpClient) {}

    backup(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
     
    });

    return this.http.post<any>(this.apiUrl, { headers });
    
  }
}