// room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiGetRoomByKeyWord = `${environment.apiBaseUrl}/rooms/getroomsbykeyword`;
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
  getAllRooms(keyword:string,
    page: number, limit: number
  ): Observable<Room[]> {
      const params = new HttpParams()
      .set('keyword', keyword)      
      .set('page', page.toString())
      .set('limit', limit.toString());            
      return this.http.get<any>(this.apiGetRoomByKeyWord, { params });
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
