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
  private apiUrl = `${environment.apiBaseUrl}/bookings/saveBookingAndBookingDetail`;
  private apiUpdateStatusUrl = `${environment.apiBaseUrl}/bookings/updateStatus`;
  private apiUpdatePaymentUrl = `${environment.apiBaseUrl}/bookings/updatePayment`;
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

  // updateStatus(booking: Booking): Observable<any> {
  //   return this.http.put(this.apiUpdateStatusUrl, booking, this.apiConfig);
  // }

  updateBookingStatus(bookingId: number, newStatus: string): Observable<any> {
    // Gọi API để cập nhật trạng thái của booking
    const options = {
      headers: this.apiConfig.headers,
      responseType: 'text' as 'json'  // Set responseType to 'text'
    };
    return this.http.put(`${this.apiUpdateStatusUrl}/${bookingId}`, { status: newStatus }, options);
  }

  updateBookingPayment(bookingId: number, newPaymentMethod: string, newPaymentDate: Date, newtotalMoney: number): Observable<any> {
    // Gọi API để cập nhật trạng thái của booking
    const options = {
      headers: this.apiConfig.headers,
      responseType: 'text' as 'json'  // Set responseType to 'text'
    };

    const payload = {
      payment_method: newPaymentMethod,
      payment_date: newPaymentDate,
      total_money: newtotalMoney
  };
    return this.http.put(`${this.apiUpdatePaymentUrl}/${bookingId}`, payload, options);
  }
}
