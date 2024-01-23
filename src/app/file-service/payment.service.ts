
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = `${environment.apiPayment}/qrcode/check/v1`;;
  private apiConfig = {
    headers: this.createHeader()  
  }
  constructor(private http: HttpClient) {}
  private createHeader(): HttpHeaders {
    return new HttpHeaders({
    // 'Content-Type': 'application/json',
    'X-Client-Certificate': 'MIID5zCCAs+gAwIBAgIUKJF12GBKxmgbd44pviCeH1cTubwwDQYJKoZIhvcNAQELBQAwgYIxCzAJBgNVBAYTAlZOMQ8wDQYDVQQIDAZIYSBOb2kxJTAjBgNVBAoMHFZJTkhPTUVTIEpPSU5UIFNUT0NLIENPTVBBTlkxFjAUBgNVBAMMDSoudmluaG9tZXMudm4xIzAhBgkqhkiG9w0BCQEWFGh1b25naHY2QHZpbml0aXMubmV0',
    'Authorization': 'Bearer AAIgNThhOWU0ZDEzNzRmZWI5NTJkOTUyMWE5ODA5MmU1M2SCuVr665m_AsUNz4l9iIXn0SpAiP7l9dIH7FTS0MJz3_U1ZElF-wZno1X3Zr9fPKS-Bo5wTmqS_xjyqlEpaPNBNTFrOc5LCHVg9NMoOW3XCq1KOJfWUZVlTvqB6WZl6QE',
    // 'X-API-Interaction-ID': '4714057426796544',
    // 'X-Idempotency-Key': '3639893016182784',
    // 'Timestamp': '1519938562',
    // 'X-Customer-IP-Address': '76.126.203.116',
    // 'Channel': 'baijupesahv',
    // 'X-JWS-Signature': 'dughujowu',
    // 'User-Agent': 'thaontt',
  });
}
  processPayment(paymentData: any): Observable<any> {
   const options = {
      headers: this.apiConfig.headers,
      mode: 'no-cors',
    };
   debugger
   console.log(paymentData);
   console.log(this.apiConfig.headers.get('Authorization'))
    return this.http.post(this.apiUrl, paymentData, this.apiConfig);
  }
}

