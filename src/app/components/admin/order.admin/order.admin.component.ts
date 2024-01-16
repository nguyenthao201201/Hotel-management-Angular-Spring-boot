import { Component } from '@angular/core';
import { BookingService } from 'src/app/file-service/booking.service';
import { BookingResponse } from 'src/app/responses/booking.response';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order.admin.component.html',
  styleUrls: ['./order.admin.component.scss']
})
export class OrderAdminComponent {
  bookings: BookingResponse[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages:number = 0;
  keyword:string = "";
  visiblePages: number[] = [];

  constructor(
    private bookingService: BookingService
  ) {

  }
  ngOnInit(): void {
    debugger
    this.getAllOrders(this.keyword, this.currentPage, this.itemsPerPage);
  }
  getAllOrders(keyword: string, page: number, limit: number) {
    debugger
    this.bookingService.getAllOrders(keyword, page, limit).subscribe({
      next: (response: any) => {
        debugger        
        this.bookings = response.bookings;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching products:', error);
      }
    });    
  }
  onPageChange(page: number) {
    debugger;
    this.currentPage = page;
    this.getAllOrders(this.keyword, this.currentPage, this.itemsPerPage);
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
  deleteOrder(id:number) {
    
  }
  
}
