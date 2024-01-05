// booking-info.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingInfoService {
  private bookingDetails: any;

  setBookingDetails(details: any) {
    this.bookingDetails = details;
  }

  getBookingDetails() {
    return this.bookingDetails;
  }
}
