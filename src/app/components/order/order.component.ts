import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomService } from '../../file-service/room.service';
import { Room } from '../../models/room';
import { format } from 'date-fns';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { BookingDTO } from '../../dtos/booking.dto';
import { BookingDetailDTO } from '../../dtos/booking-detail.dto';
import { BookingService } from '../../file-service/booking.service';
import { BookingInfoService } from '../../file-service/booking-info.service';
import { BookingDetailService } from '../../file-service/booking-detail.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;
  check_in: Date;
  check_out: Date;
  fullName: string;
  phone_number: string;
  email: string;
  address: string;
  note: string;
  room_id: number;
  room_number: string;
  price_room: number;
  room_type: string;
  // number_of_guests: number;

  rooms: Room[] = []; // Mảng rooms
  selectedRoom: Room | undefined; // Biến để lưu giá trị được chọn từ dropdown
  availableRooms: Room[] = []; // Mảng rooms có sẵn
  availableRoom: Room | undefined; // Biến để lưu giá trị có sẵn
  roomTypes: string[] = []; // Mảng các loại phòng
  selectedRoomId: number | undefined; // Biến để lưu room_id được chọn từ dropdown

  bookingDetails: BookingDetailDTO[] = [];

  formattedCheckIn: string;// Biến lưu ngày định dạng yyyy-MM-dd
  formattedCheckOut: string;

  number_of_guests: number;//lưu giá trị so nguoi
  guestQuantityOptions: number[] = [1, 2, 3, 4, 5];

  constructor(private roomService: RoomService,
    private bookingService: BookingService,
    private router: Router,
    private bookingInfoService: BookingInfoService) {
    this.check_in = new Date();
    this.check_out = new Date();
    this.room_type = '';
    this.fullName = '';
    this.phone_number = '';
    this.email = '';
    this.address = '';
    this.note = '';

    this.formattedCheckIn = '';
    this.formattedCheckOut = '';

    this.room_id = 1;
    this.room_number = '';
    this.price_room = 0;
    this.number_of_guests = 1;
  }

  validateDate() {
    const checkinDateInput = document.getElementById('checkin-date') as HTMLInputElement;
    const checkinDate = new Date(checkinDateInput.value);
    const currentDate = new Date();

    if (checkinDate < currentDate) {
      alert('Ngày nhập phải lớn hơn hoặc bằng ngày hiện tại.');
      checkinDateInput.value = ''; // Xoá giá trị nếu không hợp lệ (tùy thuộc vào yêu cầu của bạn)
    }
  }

  ngOnInit(): void {// Ở đây đã gọi luôn các loại phòng có sẵn  
    this.roomService.getRoomTypes().subscribe({
      next: (rooms: Room[]) => { // Sử dụng kiểu Room[]
        //debugger
        this.rooms = rooms;
        this.roomTypes = [...new Set(rooms.map(room => room.type))]; // Lọc các loại phòng duy nhất
      },
      error: (error: any) => {
        //debugger
        console.error('Error getting rooms:', error);
      }
    }
    );
  }
// 
  onRoomTypeChange() {
    const selectedRoomType = this.room_type;
    this.roomService.getRoomAvailable().subscribe({
      next: (availableRooms: Room[]) => {
        //debugger
        const filteredRooms = availableRooms.filter(availableRoom => availableRoom.type === selectedRoomType);
        if (filteredRooms.length > 0) {
          // Chọn ngẫu nhiên một phòng từ danh sách đã lọc
          const randomIndex = Math.floor(Math.random() * filteredRooms.length);
          const selectedRoom = filteredRooms[randomIndex];
          // Lấy room_id của phòng đã chọn
          const roomId = selectedRoom.roomId;
          this.room_id = roomId;
          console.log('Found room_id:', roomId);
          // Lấy thông tin phòng theo room_id
          this.roomService.getRoomById(roomId).subscribe(
            (roomData: any) => {
            //debugger
              this.room_number = roomData.roomNumber;
              this.price_room = roomData.priceRoom;
            },
            (error: any) => {
              console.error('Error getting room information:', error);
            }
          );
        } else {
          console.log('No available room found for the selected type.');
        }
      },
      error: (error: any) => {
        console.error('Error getting available rooms:', error);
      }
    });
  }

  confirm() {
    const message =
      `Checkin: ${this.check_in}` +
      `Checkout: ${this.check_out}` +
      `FullName: ${this.fullName}` +
      `Phone: ${this.phone_number}` +
      `Email: ${this.email}` +
      `Address: ${this.address}` +
      `Note: ${this.note}`;
    //alert(message);
    // debugger
    this.formattedCheckIn = format(this.check_in, 'yyyy-MM-dd');
    this.formattedCheckOut = format(this.check_out, 'yyyy-MM-dd');

    const bookingDTO: BookingDTO = {
      "room_id": this.room_id,
      "number_of_guests": this.number_of_guests,
      "check_in": this.formattedCheckIn,
      "check_out": this.formattedCheckOut,
      "full_name": this.fullName,
      "phone_number": this.phone_number,
      "email": this.email,
      "address": this.address,
      "note": this.note,
    }
    //debugger

    // Gọi API đăng ký phòng
    this.bookingService.bookRoom(bookingDTO).subscribe(
      (response: any) => {
        // Xử lý phản hồi từ API đặt phòng nếu cần
        console.log('Booking successful:', response);
        //Lưu thông tin đặt phòng để hiển thị sang phần thanh toán: 
        //debugger
        this.bookingInfoService.setBookingDetails(
          {
            "booking_id": response.booking_id,
            "room_id": this.room_id,
            "room_type": this.room_type,
            "price_room": this.price_room,
            "total_price_room": response.total_price_room,
            "room_number": this.room_number,
           "number_of_days": response.number_of_days,
            "number_of_guests": this.number_of_guests,
            "check_in": this.formattedCheckIn,
            "check_out": this.formattedCheckOut,
            "full_name": this.fullName,
            "phone_number": this.phone_number,
            "email": this.email,
            "address": this.address,
            "note": this.note,
          }
        )
        //debugger
        // Cập nhật trạng thái phòng
        this.roomService.updateRoomStatus(this.room_id, 'BOOKED').subscribe(
          (roomResponse: any) => {
            //debugger
            console.log('Room status updated successfully:', roomResponse);
            //debugger
            // Sau khi cập nhật trạng thái phòng, chuyển hướng hoặc thực hiện các thao tác khác
            alert('Lưu thông tin thành công, bạn đã đặt thành công phòng: ' + this.room_number + 
            ' (' + this.room_type + ') vào ngày ' + this.formattedCheckIn + ' đến ngày ' + this.formattedCheckOut + 
            '. Chúng tôi sẽ liên hệ lại bạn sớm nhất. Xin cảm ơn!');

            this.router.navigate(['/confirm']);
          },
          (roomError: any) => {
            //debugger
            // Xử lý lỗi cập nhật trạng thái phòng nếu có
            console.error('Error updating room status:', roomError);
            alert('Lưu thông tin thành công, nhưng có lỗi khi cập nhật phòng đặt, chúng tôi sẽ liên hệ lại bạn sớm nhất. Xin cảm ơn!');
            //this.router.navigate(['/confirm']);
          }
        );
      },
      (error: any) => {
        // Xử lý lỗi đặt phòng nếu có
        console.error('Error booking room:', error);
        alert('Lưu thông tin thất bại');
      }
    );
  }


  generatePDF() {
    const pdf = new jsPDF();
  
    // Thêm nội dung vào PDF
    pdf.text('Thông tin đặt phòng', 10, 10);
    pdf.text(`Loại phòng: ${this.room_type}`, 10, 20);
    // Thêm các thông tin khác tương tự
  
    // Lưu và tải xuống file PDF
    pdf.save('booking_information.pdf');
  }
  
}

// // Lấy bookingId từ response hoặc từ dữ liệu khác nếu có
// const bookingId = response.id; 
// // Cập nhật trạng thái của booking
// this.bookingService.updateBookingStatus(bookingId, 'unpaid').subscribe({
//   next: () => {
//     alert('Cập nhật trạng thái thành công');
//     // this.router.navigate(['/confirm']);
//   },
//   error: (error: any) => {
//     alert('Lỗi khi cập nhật trạng thái');
//     console.error('Error updating booking status:', error);
//   }
// });