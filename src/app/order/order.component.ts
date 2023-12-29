import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomService } from '../file-service/room.service';
import { Room } from '../models/room';
import { format } from 'date-fns';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { BookingDTO } from '../dtos/booking.dto';
import { BookingDetailDTO } from '../dtos/booking-detail.dto';
import { BookingService } from '../file-service/booking.service';
import { BookingDetailService } from '../file-service/booking-detail.service';
import { Router } from '@angular/router';

//import { FormControl } from '@angular/forms';
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
  number_of_rooms: number;

  rooms: Room[] = []; // Mảng rooms
  selectedRoom: Room | undefined; // Biến để lưu giá trị được chọn từ dropdown
  roomTypes: string[] = []; // Mảng các loại phòng
  selectedRoomId: number | undefined; // Biến để lưu room_id được chọn từ dropdown

  bookingDetails: BookingDetailDTO[] = [];

  formattedCheckIn: string;// Biến lưu ngày định dạng yyyy-MM-dd
  formattedCheckOut: string;

  // const formattedCheckIn = format(check_in, 'yyyy-MM-dd');
  // const formattedCheckOut = format(check_out, 'yyyy-MM-dd');
  constructor(private roomService: RoomService, 
              private bookingService: BookingService,
              private bookingDetailService: BookingDetailService,
              private router: Router) {
     this.check_in = new Date();
    //  this.check_in = '2023-12-30';
     this.check_out = new Date();
    //  this.check_out = '2023-12-30';
    this.fullName = 'Thu Thảo';
    this.phone_number = '12345456';
    this.email = 'nguyenthao@gmail.com';
    this.address = 'dfdgf';
    this.note = 'đsdsd';

    this.formattedCheckIn = format(this.check_in, 'yyyy-MM-dd');
    this.formattedCheckOut = format(this.check_out, 'yyyy-MM-dd');

    this.room_id = 1;
    this.number_of_rooms = 1;
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

  numbers: number[] = Array.from({ length: 10 }, (_, index) => index + 1);

  ngOnInit(): void {
    this.roomService.getRoomTypes().subscribe({
      next: (rooms: Room[]) => { // Sử dụng kiểu Room[]
        //debugger
        this.rooms = rooms;
        // Chọn phòng đầu tiên làm giá trị mặc định
        this.selectedRoom = rooms.length > 0 ? rooms[0] : undefined;
        // Lọc các loại phòng duy nhất
        this.roomTypes = [...new Set(rooms.map(room => room.type))];
      },
      error: (error: any) => {
        //debugger
        console.error('Error getting rooms:', error);
      }
    }
    );
  }
  
  onRoomTypeChange() {
    // Gọi service để lấy danh sách phòng có sẵn
    this.roomService.getRoomAvailable().subscribe({
      next: (availableRooms: any[]) => {
        // Lọc danh sách phòng theo loại và status
        debugger
        const selectedRoomWithStatus = availableRooms.find(rooms =>
          rooms.type === this.selectedRoom?.type
        );
  debugger
        // Kiểm tra xem phòng có sẵn không và lấy room_id
        if (selectedRoomWithStatus) {
          const roomId = selectedRoomWithStatus.room_id;
          console.log('Found room_id:', roomId);
          // Thực hiện các hành động khác cần thiết với roomId
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
      `Checkin: ${this.formattedCheckIn}` +
      `Checkout: ${this.formattedCheckOut}` +
      `FullName: ${this.fullName}` +
      `Phone: ${this.phone_number}` +
      `Email: ${this.email}` +
      `Address: ${this.address}` +
      `Note: ${this.note}`;
    //alert(message);
    //debugger
    const bookingDTO:BookingDTO = {
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
    this.bookingService.bookRoom(bookingDTO).subscribe({
      next: (response: any) => {
        //debugger
        alert('Đặt phòng thành công');
         this.router.navigate(['/confirm']);
      },
      error: (error: any) => {
        //debugger
        alert('Đặt phòng thất bại');
        console.error('Error booking room:', error);
      }
    });



    // Tạo DTO cho booking detail
  const bookingDetailDTO: BookingDetailDTO = {
    "room_id": this.room_id, 
    "number_of_rooms": this.number_of_rooms
  };

  // Gọi API để lưu thông tin booking detail
  this.bookingDetailService.saveBookingDetail(bookingDetailDTO).subscribe({
    next: (detailResponse: any) => {

      // Xử lý khi lưu booking detail thành công
    },
    error: (detailError: any) => {
      // Xử lý khi lưu booking detail thất bại
      console.error('Error saving booking detail:', detailError);
    }
  });

  }
  
  }

