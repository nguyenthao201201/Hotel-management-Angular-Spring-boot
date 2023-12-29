// room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiGetRooms = `${environment.apiBaseUrl}/rooms/all`; 
  private apiGetRoomAvailable = `${environment.apiBaseUrl}/rooms/available`;
  constructor(private http: HttpClient) {}

  getRoomTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGetRooms);
  }

  getRoomAvailable(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGetRoomAvailable);
  }
}
