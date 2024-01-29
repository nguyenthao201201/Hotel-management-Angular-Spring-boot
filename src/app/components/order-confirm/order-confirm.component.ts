import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingInfoService } from '../../file-service/booking-info.service';
import { BookingService } from '../../file-service/booking.service';
import { NgForm } from '@angular/forms';
import { concatMap, forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit{
  @ViewChild('registerForm') registerForm!: NgForm;
  card_payment: string;
  bookingDetails: any;

  paymentDate: Date;
  paymentMethod: string;

  constructor(private bookingInfoService: BookingInfoService,
  private bookingService: BookingService,
  private router: Router) {
    this.card_payment = '';
    this.paymentDate = new Date();
    this.paymentMethod = '';

   }

  ngOnInit(): void {
    //debugger
    this.bookingDetails = this.bookingInfoService.getBookingDetails();
  }
// Khai báo các biến paymentMethod cho từng loại thanh toán
atmPaymentMethod: string = '';
qrPaymentMethod: string = '';
onArrivalPaymentMethod: string = '';
eWalletPaymentMethod: string = '';
creditCardPaymentMethod: string = '';

// Method để xử lý sự thay đổi của checkbox
onPaymentMethodChange(value: string, methodType: string) {
  // Cập nhật giá trị paymentMethod tương ứng
  switch (methodType) {
    case 'ATM':
      this.atmPaymentMethod = value;
      break;
    case 'QR':
      this.qrPaymentMethod = value;
      break;
    case 'OnArrival':
      this.onArrivalPaymentMethod = value;
      break;
    case 'EWallet':
      this.eWalletPaymentMethod = value;
      break;
    case 'CreditCard':
      this.creditCardPaymentMethod = value;
      break;
    default:
      break;
  }
  this.paymentMethod = value;

  if(value != null){
  
  }
}

pay() {
  // Gọi API để cập nhật trạng thái của booking
  const updateBookingStatus$ = this.bookingService.updateBookingStatus(this.bookingDetails.booking_id, 'Paid');

  // Kết hợp với observable để chờ cho đến khi nó hoàn thành
  updateBookingStatus$.pipe(
    concatMap(() => {
      // Gọi API để cập nhật thanh toán
      const total_money = this.bookingDetails.total_price_room;
      return this.bookingService.updateBookingPayment(
        this.bookingDetails.booking_id,
        this.paymentMethod,
        this.paymentDate,
        total_money
      );
    })
  ).subscribe(
    (response: any) => {
      console.log('Cập nhật trạng thái và thanh toán thành công', response);
      alert('Vui lòng đăng nhập tài khoản ngân hàng và quét mã!');
      this.bookingInfoService.setBookingDetails(
        {
       "total_money": this.bookingDetails.total_price_room,
       "details": 'Than toán đơn hàng số '+this.bookingDetails.booking_id,
        });
    this.router.navigate(['/payment']);
      // Chuyển hướng hoặc thực hiện các thao tác khác sau khi thanh toán thành công
    },
    (error: any) => {
      console.log('Có lỗi khi cập nhật trạng thái hoặc thanh toán', error);
      // Xử lý lỗi và thông báo lỗi cho người dùng nếu cần
    }
  );
}

  }
