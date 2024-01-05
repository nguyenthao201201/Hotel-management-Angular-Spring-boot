// room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiGetRooms = `${environment.apiBaseUrl}/rooms/all`; 
  private apiGetRoomById = `${environment.apiBaseUrl}/rooms`;
  private apiGetRoomAvailable = `${environment.apiBaseUrl}/rooms/available`;
  private apiUpdateStatusUrl = `${environment.apiBaseUrl}/rooms/updateStatus`;

  private apiConfig = {
    headers: this.createHeader()  
  }
  constructor(private http: HttpClient) {}

  private createHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'});
  }

  getRoomTypes(): Observable<any[]> {

    return this.http.get<any[]>(this.apiGetRoomAvailable, this.apiConfig);
  }

  getRoomAvailable(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGetRoomAvailable, this.apiConfig);
  }

getRoomById(roomId: number): Observable<any> {
  return this.http.get<any>(`${this.apiGetRoomById}/${roomId}`, this.apiConfig);
}


  updateRoomStatus(roomId: number, newStatus: string): Observable<any> {
    const options = {
      headers: this.apiConfig.headers,
      responseType: 'text' as 'json'  // Set responseType to 'text'
    };
    // Gọi API để cập nhật trạng thái của booking
    return this.http.put(`${this.apiUpdateStatusUrl}/${roomId}`, { status: newStatus }, options);
  }

}
