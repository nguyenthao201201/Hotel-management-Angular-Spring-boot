import { Component } from '@angular/core';
import { RoomService } from 'src/app/file-service/room.service';
import { Room } from 'src/app/models/room';
import { RoomResponse } from 'src/app/responses/room.response';
import { Router } from '@angular/router';
@Component({
  selector: 'app-room-admin',
  templateUrl: './room.admin.component.html',
  styleUrls: ['./room.admin.component.scss']
})
export class RoomAdminComponent {
  rooms: Room[] = [];
  currentPage: number =  0;
  itemsPerPage: number = 10;
  pages: number[] = [];
  totalPages:number = 0;
  keyword:string = "";
  visiblePages: number[] = [];

constructor(
  private roomService: RoomService,
  private router: Router
) {}
ngOnInit(): void {
 // debugger
  this.getAllRooms(this.keyword, this.currentPage, this.itemsPerPage);
}

getAllRooms(keyword: string, page: number, limit: number) {
  //debugger
  this.roomService.getAllRooms(keyword, page, limit).subscribe({
    next: (response: any) => {
      //debugger        
      this.rooms = response.rooms;
      this.totalPages = response.totalPages;
      this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
    },
    complete: () => {
      //debugger;
    },
    error: (error: any) => {
      //debugger;
      console.error('Error fetching products:', error);
    }
  });    
}
  onPageChange(page: number) {
    //debugger;
    this.currentPage = page;
    this.getAllRooms(this.keyword, this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0)
        .map((_, index) => startPage + index);
  }

  editRoom(room:Room) {
    debugger
    this.router.navigate(['/edit-room-admin', room.roomId]);
  }

}
