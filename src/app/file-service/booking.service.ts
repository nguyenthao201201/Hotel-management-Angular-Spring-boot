// booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking';
import { environment } from '../environments/environment';
import { BookingDTO } from '../dtos/booking.dto';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = `${environment.apiBaseUrl}/bookings`;
  private apiConfig = {
    headers: this.createHeader()  
  }

  constructor(private http: HttpClient) { }

  private createHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'});
  }

  bookRoom(bookingDTO:BookingDTO): Observable<any> {
    return this.http.post(this.apiUrl, bookingDTO, this.apiConfig);
  }
}
