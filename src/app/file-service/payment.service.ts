
//gọi thử từ bakend
// payment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = `${environment.apiBaseUrl}/api/payment/makePayment`;  

  constructor(private http: HttpClient) {}

  makePayment(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
     
    });

    return this.http.post<any>(this.apiUrl, paymentData, { headers });
  }
}

//gọi thử từ frontend

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class PaymentService {
// // private apiUrl = `${environment.apiUrl}/bidv/sandbox/open-banking/qrcode/check/v1`;
//  private apiUrl = `https://openapi.bidv.com.vn/bidv/sandbox/open-banking/qrcode/check/v1`;
//   private apiConfig = {
//     headers: this.createHeader()  
//   }
//   constructor(private http: HttpClient) {}
//   private createHeader(): HttpHeaders {
//     return new HttpHeaders({
//     'Content-Type': 'application/json',
//     'X-Client-Certificate': 'MIID5zCCAs+gAwIBAgIUKJF12GBKxmgbd44pviCeH1cTubwwDQYJKoZIhvcNAQELBQAwgYIxCzAJBgNVBAYTAlZOMQ8wDQYDVQQIDAZIYSBOb2kxJTAjBgNVBAoMHFZJTkhPTUVTIEpPSU5UIFNUT0NLIENPTVBBTlkxFjAUBgNVBAMMDSoudmluaG9tZXMudm4xIzAhBgkqhkiG9w0BCQEWFGh1b25naHY2QHZpbml0aXMubmV0',
//     'Authorization': 'Bearer AAIgNThhOWU0ZDEzNzRmZWI5NTJkOTUyMWE5ODA5MmU1M2RC1Bv_m5F6XgBFKVadEj_Am50X5CvcbrRZCkPaeWV5ijsPqsCGkJnBs9oKHmsRjzzGvY97dSawQ3999_FgD6JN1CaxJjkEdtyTZ6IlatGAW1QR3OEGk2_771wIO2cUBnk',
//     'X-API-Interaction-ID': '4714057426796544',
//     // 'X-Idempotency-Key': '3639893016182784',
//     // 'Timestamp': '1519938562',
//     // 'X-Customer-IP-Address': '76.126.203.116',
//     // 'Channel': 'baijupesahv', 
//     // 'X-JWS-Signature': 'dughujowu',
//     // 'User-Agent': 'thaontt',
//   });
// }
//   processPayment(paymentData: any): Observable<any> {
//    const options = {
//       headers: this.apiConfig.headers,
//       mode: 'no-cors',
//     };
//    debugger
//    console.log(paymentData);
//    console.log(this.apiConfig.headers.get('Authorization'))
//     return this.http.post(this.apiUrl, paymentData, this.apiConfig);
//   }
// }
