import { Component, OnInit, inject} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RoomResponse } from "src/app/responses/room.response";
import { RoomService } from "src/app/file-service/room.service";
import { NgForm } from "@angular/forms";
 
@Component({
    selector: "app-edit-room-admin",
    templateUrl: "./edit.room.admin.component.html",
    styleUrls: ["./edit.room.admin.component.scss"]
    })
    
export class EditRoomAdminComponent implements OnInit{
    room_id: number = 0;
    price: number = 0;
    room_number: string = '';
    status: string = '';
    type: string = '';
    description: string = '';
    
    roomResponse: RoomResponse = {
        room_id: 0,
        price: 0,
        room_number: '',
        status: '',
        type: '',
        description: '',
    };

    private roomService = inject(RoomService);
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.getRoomById();
    }
    getRoomById() {
        this.room_id = Number(this.route.snapshot.paramMap.get('id'));
        debugger;
        this.roomService.getRoomById(this.room_id).subscribe({
            next: (response: any) => {
                debugger;
                this.roomResponse = response;
            },
            error: (error: any) => {
                debugger;
                console.error('Error fetching products:', error);
            }
        });
    }
    saveRoom() {
        const roomDTO: any = {}; // Sử dụng kiểu any để có thể động lực
        roomDTO.room_id = this.room_id;
        // Kiểm tra sự thay đổi ở từng trường thông tin và gán giá trị mới nếu có thay đổi
        if (this.price == 0) {
            roomDTO.price = this.roomResponse.price;
        }
        else{ roomDTO.price = this.price;}
    
        if (this.room_number == '') {
            roomDTO.room_number = this.roomResponse.room_number;
        }
        else{ roomDTO.room_number = this.room_number;}
    
        if (this.status == '') {
            roomDTO.status = this.roomResponse.status;
        }
        else{ roomDTO.status = this.status;}
    
        if (this.type == '') {
            roomDTO.type = this.roomResponse.type;
        }
        else{ roomDTO.type = this.type;}
    
        if (this.description == '') {
            roomDTO.description = this.roomResponse.description;
        } 
        else{ roomDTO.description = this.description;}
        
    
        // Nếu có bất kỳ sự thay đổi nào, gán room_id
        debugger;
        this.roomService.updateRoom(roomDTO).subscribe({
            next: () => {
                this.router.navigate(['/admin/rooms']);
            },
            error: (error: any) => {
                console.error('Error updating product: ', error);
            }
        });
    }
}
// 