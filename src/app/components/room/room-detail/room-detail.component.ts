import { Component } from '@angular/core';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent {

   roomNo : string = '510';

   onClickMe(room: string) {
    this.roomNo = room;
  }

}
