import { Component, OnInit, inject} from "@angular/core";
import { BookingResponse } from "src/app/responses/booking.response";
import { ActivatedRoute, Router } from "@angular/router";
import { BookingService } from "src/app/file-service/booking.service";
import { BookingDTO } from "src/app/dtos/booking.dto";
import { format } from "date-fns";

@Component({
  selector: "app-edit-order-admin",
  templateUrl: "./edit.order.admin.component.html",
  styleUrls: ["./edit.order.admin.component.scss"]
})
export class EditOrderAdminComponent implements OnInit{    
    orderId:number = 0;
    user_id: number = 0;
    full_name: string = '';
    phone_number: string = '';
    address: string = '';
    note: string = '';
    check_in: Date = new Date;
    check_out: Date = new Date;
    formattedCheckIn: string = '';
    formattedCheckOut: string = '';
    status: string = '';
    total_money: number = 0;
    payment_date: Date = new Date;
    bookingResponse: BookingResponse = {
        id: 0,
        user_id: 0,
        full_name: '',
        phone_number: '',
        address: '',
        email: '',
        check_in: '',
        check_out: '',
        status: '',
        total_money: 0,
        payment_method: '',
        payment_date: new Date,
        note: '',
        is_active: false,
        booking_details: [],
      
    };  
    editedCheckOut: Date | String = '';
    private bookingService = inject(BookingService);
    constructor(    
      private route: ActivatedRoute,
      private router: Router
      ) {
    
      }
  
    ngOnInit(): void {
      this.getBookingDetails();
    }
    
    getBookingDetails(): void {
      debugger
      this.orderId = Number(this.route.snapshot.paramMap.get('id'));
      this.bookingService.getBookingById(this.orderId).subscribe({
        next: (response: any) => {        
          debugger;       
          this.bookingResponse.id = response.id;
          this.bookingResponse.user_id = response.user_id;
          this.bookingResponse.full_name = response.full_name;
          this.bookingResponse.phone_number = response.phone_number;
          this.bookingResponse.email = response.email;
          this.bookingResponse.address = response.address; 
          this.bookingResponse.note = response.note;
          this.bookingResponse.total_money = response.total_money;
          this.bookingResponse.payment_method = response.payment_method;
          this.bookingResponse.check_in = format(response.check_in , 'yyyy-MM-dd');      
          this.bookingResponse.check_out = response.check_out;
          this.bookingResponse.booking_details = response.booking_details
            .map((booking_detail:any) => {
                booking_detail.number_of_days = booking_detail.number_of_days
            //order_detail.total_money = order_detail.totalMoney
            return booking_detail;
          });        
          this.bookingResponse.payment_method = response.payment_method;
          // if (response.payment_date) {
          //   this.bookingResponse.payment_date = new Date(
          //     response.payment_date[0],
          //     response.payment_date[1] - 1,
          //     response.payment_date[2]
          //   );
          // }          
          this.bookingResponse.status = response.status;     
          debugger   
        },      
        complete: () => {
          debugger;        
        },
        error: (error: any) => {
          debugger;
          console.error('Error fetching detail:', error);
        },
      });
    }    
    
    saveOrder(): void {    
    debugger
    this.formattedCheckIn = format(this.bookingResponse.check_in, 'yyyy-MM-dd');
    this.formattedCheckOut = format(this.check_out, 'yyyy-MM-dd');
      const bookingDTO: any ={
      }

      bookingDTO.id = this.bookingResponse.id;
      bookingDTO.user_id = this.bookingResponse.user_id;
      bookingDTO.full_name = this.bookingResponse.full_name;
      bookingDTO.phone_number = this.bookingResponse.phone_number;
      bookingDTO.email = this.bookingResponse.email;
      bookingDTO.address = this.bookingResponse.address;
      if (this.note == '') {
        bookingDTO.note = this.bookingResponse.note;
      }
      else{ bookingDTO.note = this.note;}

      bookingDTO.check_in = this.formattedCheckIn;
      if (!this.check_out) {
        bookingDTO.check_out = this.bookingResponse.check_out;
      }
      else { 
        bookingDTO.check_out = this.formattedCheckOut;
      }

      if(this.total_money == 0){
        bookingDTO.total_money = this.bookingResponse.total_money;
      }
      else{
        bookingDTO.total_money = this.total_money;
      }
      bookingDTO.payment_method = this.bookingResponse.payment_method;
      bookingDTO.payment_date = this.payment_date;
      if(this.status == ''){
        bookingDTO.status = this.bookingResponse.status;
      }
      else{
        bookingDTO.status = this.status;
      }

    
    // const bookingDTO: BookingDTO = {
    //  // "id": this.bookingResponse.id,
    //   "user_id": this.user_id,
    //   "full_name": this.bookingResponse.full_name,
    //   "phone_number": this.bookingResponse.phone_number,
    //   "email": this.bookingResponse.email,
    //   "address": this.bookingResponse.address,
    //   "note": this.note,
    //   "check_in": this.formattedCheckIn,
    //   "check_out": this.formattedCheckOut,
    //   "total_money": this.total_money,
    //   "payment_method": this.bookingResponse.payment_method,
    //   "payment_date": this.payment_date,
    //   "status": this.bookingResponse.status,
    // }
      this.bookingService.updateBooking(this.orderId, bookingDTO).subscribe({
        next: (response: Object) => {
          debugger
          //console.log('Order updated successfully:', response);
          // Navigate back to the previous page
          //this.router.navigate(['/admin/orders']);       
          this.router.navigate(['/admin'], { relativeTo: this.route });
        },
        complete: () => {
          debugger;        
        },
        error: (error: any) => {
          // Handle the error
          debugger
          console.error('Error updating order:', error);
          this.router.navigate(['../'], { relativeTo: this.route });
        }
      });   
    }

}