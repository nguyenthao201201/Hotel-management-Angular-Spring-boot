import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingDetailDTO } from '../dtos/booking-detail.dto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingDetailService {
// 
  private apiUrl = `${environment.apiBaseUrl}/booking-details`; 
  private apiConfig = {
    headers: this.createHeader()  
  }

  constructor(private http: HttpClient) { }

  private createHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'});
  }
  
  saveBookingDetail(bookingDetailDTO: BookingDetailDTO): Observable<any> {
    return this.http.post(this.apiUrl, bookingDetailDTO, this.apiConfig);
  }
}
