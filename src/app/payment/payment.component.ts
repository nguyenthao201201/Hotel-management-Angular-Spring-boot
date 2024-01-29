import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/file-service/payment.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookingInfoService } from 'src/app/file-service/booking-info.service';
//import * as QRCode from 'qrcode-generator';
import * as QRCode from 'qrcode-generator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements  OnInit{
//  qrData: string = "0002010102122623000697048801091233211245204123453037045405387005802VN5918Trung tam the test6005HANOI62320105166160311BENH VIEN E0704BV01630441B1";
qrData: string ="00020101021238540010A00000072701240006970418011088307759060208QRIBFTTA5303704540115802VN62230819Thanh toan don hang6304AFBF";
  qrCode: any;
  paymentData: any ={};
  paymentResult: any = {};

  
  mobile: string = '0965031298';
  bankCode: string = '970488';
  accountNo: string = '63110000797152';
  payDate: string = '20221114100944';
  debitAmount: string = '38700';
  respCode: string = '00';
  respDesc: string = 'Thanh cong';
  traceTransfer: string = '1207638';
  messageType: string = '1';
  orderCode: string = '1207638';
  userName: string = '0965031298';
  quantity: string = '1';
  qrInfor: string = '0002010102122623000697048801091233211245204123453037045405387005802VN5918Trung tam the test6005HANOI62320105166160311BENH VIEN E0704BV01630441B1';
  checkSum: string = 'FC400D489EE546FF899D2809F80A10EC';
  realAmount: string = '38700.0';
  rate: string = '';
  mobileNo: string = '0965031298';
  transId: string = '1207638';
  sessionId: String = '';
  data: String = 'eyJrIjoiMDdEMUNFMTY2MjE5NzI1MDk0MjQ2QjYyMzhCNjQ0OUZDQzA0NkQ1MDExRjI5RTI5MzcxNEFFQzcwMzQ4MjhFRURCNUU3QTBCMURFQTE0QkZCMkM1MzdDMzA1NDhBMDBDODI3QUFEMDAwNUM1N0U1NkUwOUI2ODRCNzY5NzlEMDIzNjI0M0M0MDI1OTQwNzgxQkVDQTk2Mzk4ODM5MjQ3OTRDOUYiLCJlIjoiRDU3MEVFMDEwODFCNTEyNUMxNjFENjAyMDNDRUUwMjk4MUIxNTNFRjQxMTUwRDVGQTU3MzNGNzJGNDZDRkFDQTQ3RUVEOUU4NDM3Qzk0ODg2MUE0M0FCRTQ0NzRFMDBFQkFFQTcwRTNDREI2QUJGMkZFMjg1OUE2QTczOEVCMUVBOThBNjk4QTkxODUxNUE5RDk0NDY0NkYwMjVBRUI0NzEzRTk2MDA2QkI1NjgxNjdBQURBNjg3OTdEMzdBMjY0RjEwMkM4NzYwNTIzRkQxNDUyRDMzREFDNEYyMEQ2MzZFMTJCRTAwNUFGMTVFMTk5MzY4MDg4NjAyN0IyNjJGQ0IwOUU3MThBRENFNThDMzk4QzFDMTE1N0M2MkEyOUQ1MkJCRjg5ODNBRDZFN0Y4MDE4QUI2ODM0MjAzRDUwRTg5NDk1RkE3ODMyRTBFNjEzQjg0MzhDMUNBMjdGQzQwQzlCNEU3NjY1RjgyM0UxNTBCNEM3NzRDNTQ4MDg5MkE5REI1NDNBQ0FDMkU4Q0U4OEZGMEJGNkExNUI1ODQ5RUY3MkQxOUJCRTA1Q0U1OUMxOTFGQzA1QjIzMzAzNkEwQ0YyN0VEOUNDN0VFNTM3ODVCNTBDMTkzNEU0RDUyNjk5RTk2RjdFQ0FGMzk1QzRCRjVFRDExQzMwNEIzQzk0NEIxNTYyNDI5RDg5Q0Q2MDM0OERCNURDOTI3MDk1NTU0QkZDOTEwQjlFQTVCNEIwQUI0OUJDRjNFQTY4NzhDRUI2QUFEMUJCOTgyMUMwQzhDM0U0RjcwNjU0QUI4RTEwMjJGNDg0QzFENkZGRDRCMUJCNENEREEwMUJGNEVFOTAzOTExQzFBOTlBNEQ4MzMwRkI1NzNDOUEzMTUxN0E5MjI1ODUzNzZBOEQxMjZDOUYzMTJEOTIyQjA1NTY0M0Y2QzMiLCJzIjoiTUVRQ0lFY29OMXpxSTc4OXhHOGpYSm1ORlVVbkEreGxpZHIxWmp3UTRCSElrOHNRQWlEblBpM3M5M3hFVnFDdmdCQ0MwZ1U1MGpoWlwvYjlWTktjOUREblBOdkRPNmc9PSIsImxpY2Vuc2VWZXJzaW9uIjoiMzgzMTciLCJ0IjoxNjY4Mzk1MzIyfQ==';
        channel: String = '6015';
        lang: String = 'VN';
        optType: String = 'SOFTOTP';


  
  bookingDetails: any;
  ngOnInit(): void {
   debugger
    this.bookingDetails = this.bookingInfoService.getBookingDetails();
  }
  constructor(private paymentService: PaymentService,
    private bookingInfoService: BookingInfoService,
    private http: HttpClient,
    private router: Router
  
    ) {
      this.generateQRCode();
    }

    generateQRCode() {
      // Tạo đối tượng QRCode
      this.qrCode = QRCode(0, 'H');
      this.qrCode.addData(this.qrData);
      this.qrCode.make();
    }

    getQRCodeImage(): string {
      // Lấy dữ liệu từ QR code và chuyển đổi thành đường dẫn ảnh
      return this.qrCode.createDataURL(5, 0);
    }
    
  // Hàm xử lý thanh toán
  makePayment() {
    debugger
    const paymentData = {
      "mobile":this.mobile,
      "bankCode": "970488",
      "accountNo": "63110000797152",
      "payDate": "20221114100944",
      "debitAmount": "38700",
      "respCode": "00",
      "respDesc": "Thanh cong",
      "traceTransfer": "1207638",
      "messageType": "1",
      "orderCode": "1207638",
      "userName": "0965031298",
      "item": [
        {
          "quantity": "1",
          "qrInfor": "0002010102122623000697048801091233211245204123453037045405387005802VN5918Trung tam the test6005HANOI62320105166160311BENH VIEN E0704BV01630441B1"
        }
      ],
      "checkSum": "FC400D489EE546FF899D2809F80A10EC",
      "realAmount": "38700.0",
      "rate": "",
      "otpInfo": {
        "mobileNo": "0965031298",
        "userName": "0965031298",
        "transId": "1207638",
        "sessionId": "e5187f66bd954da08bf2115fa0802fc4",
        "data": "eyJrIjoiMDdEMUNFMTY2MjE5NzI1MDk0MjQ2QjYyMzhCNjQ0OUZDQzA0NkQ1MDExRjI5RTI5MzcxNEFFQzcwMzQ4MjhFRURCNUU3QTBCMURFQTE0QkZCMkM1MzdDMzA1NDhBMDBDODI3QUFEMDAwNUM1N0U1NkUwOUI2ODRCNzY5NzlEMDIzNjI0M0M0MDI1OTQwNzgxQkVDQTk2Mzk4ODM5MjQ3OTRDOUYiLCJlIjoiRDU3MEVFMDEwODFCNTEyNUMxNjFENjAyMDNDRUUwMjk4MUIxNTNFRjQxMTUwRDVGQTU3MzNGNzJGNDZDRkFDQTQ3RUVEOUU4NDM3Qzk0ODg2MUE0M0FCRTQ0NzRFMDBFQkFFQTcwRTNDREI2QUJGMkZFMjg1OUE2QTczOEVCMUVBOThBNjk4QTkxODUxNUE5RDk0NDY0NkYwMjVBRUI0NzEzRTk2MDA2QkI1NjgxNjdBQURBNjg3OTdEMzdBMjY0RjEwMkM4NzYwNTIzRkQxNDUyRDMzREFDNEYyMEQ2MzZFMTJCRTAwNUFGMTVFMTk5MzY4MDg4NjAyN0IyNjJGQ0IwOUU3MThBRENFNThDMzk4QzFDMTE1N0M2MkEyOUQ1MkJCRjg5ODNBRDZFN0Y4MDE4QUI2ODM0MjAzRDUwRTg5NDk1RkE3ODMyRTBFNjEzQjg0MzhDMUNBMjdGQzQwQzlCNEU3NjY1RjgyM0UxNTBCNEM3NzRDNTQ4MDg5MkE5REI1NDNBQ0FDMkU4Q0U4OEZGMEJGNkExNUI1ODQ5RUY3MkQxOUJCRTA1Q0U1OUMxOTFGQzA1QjIzMzAzNkEwQ0YyN0VEOUNDN0VFNTM3ODVCNTBDMTkzNEU0RDUyNjk5RTk2RjdFQ0FGMzk1QzRCRjVFRDExQzMwNEIzQzk0NEIxNTYyNDI5RDg5Q0Q2MDM0OERCNURDOTI3MDk1NTU0QkZDOTEwQjlFQTVCNEIwQUI0OUJDRjNFQTY4NzhDRUI2QUFEMUJCOTgyMUMwQzhDM0U0RjcwNjU0QUI4RTEwMjJGNDg0QzFENkZGRDRCMUJCNENEREEwMUJGNEVFOTAzOTExQzFBOTlBNEQ4MzMwRkI1NzNDOUEzMTUxN0E5MjI1ODUzNzZBOEQxMjZDOUYzMTJEOTIyQjA1NTY0M0Y2QzMiLCJzIjoiTUVRQ0lFY29OMXpxSTc4OXhHOGpYSm1ORlVVbkEreGxpZHIxWmp3UTRCSElrOHNRQWlEblBpM3M5M3hFVnFDdmdCQ0MwZ1U1MGpoWlwvYjlWTktjOUREblBOdkRPNmc9PSIsImxpY2Vuc2VWZXJzaW9uIjoiMzgzMTciLCJ0IjoxNjY4Mzk1MzIyfQ==",
        "channel": "6015",
        "lang": "VN"
      },
      "otpType": "SOFTOTP"

    };

    // Gọi service để thực hiện thanh toán
    this.paymentService.makePayment(paymentData).subscribe(
      (response: any) => {
        debugger
        alert('Đơn hàng đã thanh toán thành công, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!');
        this.router.navigate(['/payment']);
        console.log('Payment Response:', response);
       
      },
      (error: any) => {
        debugger
        console.log('Payment Error:', error);
      } // Remove the semicolon here
    )
      // Xử lý response từ API hoặc dữ liệu giả mạo
    }
    // 
  


}
