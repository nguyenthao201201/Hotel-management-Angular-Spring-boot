import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingInfoService } from '../file-service/booking-info.service';
import { BookingService } from '../file-service/booking.service';
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
    debugger
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
      alert('Thanh toán thành công!');
    this.router.navigate(['https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1806000&vnp_Command=pay&vnp_CreateDate=20210801153333&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang+%3A5&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Fdomainmerchant.vn%2FReturnUrl&vnp_TmnCode=DEMOV210&vnp_TxnRef=5&vnp_Version=2.1.0&vnp_SecureHash=3e0d61a0c0534b2e36680b3f7277743e8784cc4e1d68fa7d276e79c23be7d6318d338b477910a27992f5057bb1582bd44bd82ae8009ffaf6d141219218625c42']);
      // Chuyển hướng hoặc thực hiện các thao tác khác sau khi thanh toán thành công
    },
    (error: any) => {
      console.log('Có lỗi khi cập nhật trạng thái hoặc thanh toán', error);
      // Xử lý lỗi và thông báo lỗi cho người dùng nếu cần
    }
  );
}

  // pay() {
  //   // Gọi API để cập nhật trạng thái của booking
  //   const updateBookingStatus$ = this.bookingService.updateBookingStatus(this.bookingDetails.booking_id, 'Paid');
  
  //   // Gọi API để cập nhật thanh toán
  //   const total_money = this.bookingDetails.total_price_room;
  //   const updateBookingPayment$ = this.bookingService.updateBookingPayment(
  //     this.bookingDetails.booking_id,
  //     this.paymentMethod,
  //     this.paymentDate,
  //     total_money
  //   );
  
  //   // Kết hợp cả hai observable và chờ cho đến khi cả hai đều hoàn thành
  //   forkJoin([updateBookingStatus$, updateBookingPayment$]).subscribe(
  //     (responses: any) => {
  //       console.log('Cập nhật trạng thái và thanh toán thành công', responses);
  //       alert('Thanh toán thành công!');
  //       // Chuyển hướng hoặc thực hiện các thao tác khác sau khi thanh toán thành công
  //     },
  //     (errors: any) => {
  //       console.log('Có lỗi khi cập nhật trạng thái hoặc thanh toán', errors);
  //       // Xử lý lỗi và thông báo lỗi cho người dùng nếu cần
  //     }
  //   );
  }
