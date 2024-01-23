// booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking';
import { environment } from '../environments/environment';
import { BookingAndDetailDTO } from '../dtos/booking.detail.dto';
import { BookingDTO } from '../dtos/booking.dto';
import { BookingResponse } from '../responses/booking.response';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
 private apiGetUrl = `${environment.apiBaseUrl}/bookings`;
  private apiUrl = `${environment.apiBaseUrl}/bookings/saveBookingAndBookingDetail`;
  private apiUpdateStatusUrl = `${environment.apiBaseUrl}/bookings/updateStatus`;
  private apiUpdatePaymentUrl = `${environment.apiBaseUrl}/bookings/updatePayment`;
  private apiGetAllOrders = `${environment.apiBaseUrl}/bookings/getbookingsbykeyword`;
  private apiConfig = {
    headers: this.createHeader()  
  }

  constructor(private http: HttpClient) { }

  private createHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'});
  }

  bookRoom(bookingDTO:BookingAndDetailDTO): Observable<any> {
   // debugger
    return this.http.post(this.apiUrl, bookingDTO, this.apiConfig);
  }

  getBookingById(id: number): Observable<BookingResponse> {
    return this.http.get<BookingResponse>(`${this.apiGetUrl}/${id}`);
  }

  updateBooking(bookingId: number, bookingData: BookingDTO): Observable<Object> {//chuyển BookingDTO thành BookingResponse
    const url = `${environment.apiBaseUrl}/bookings/all/${bookingId}`;
    return this.http.put(url, bookingData);
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
    const options = {// Gọi API để cập nhật trạng thái của booking
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

  getAllOrders(keyword:string,
    page: number, limit: number
  ): Observable<BookingResponse[]> {
      const params = new HttpParams()
      .set('keyword', keyword)      
      .set('page', page.toString())
      .set('limit', limit.toString());            
      return this.http.get<any>(this.apiGetAllOrders, { params });
  }
  deleteOrder(orderId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/bookings/${orderId}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
