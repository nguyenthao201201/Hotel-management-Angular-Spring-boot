import {
    IsString,
    IsPhoneNumber,
    IsDate
}

from 'class-validator';

export class BookingDTO {
    //thêm hai trường lưu dữ liệu vào booking_detail

    room_id: number;

    number_of_guests: number;

    @IsString()
    full_name: string;

    @IsPhoneNumber()
    phone_number: string;

    @IsString()
    address: string;

    @IsString()
    email: string;

    @IsString()
    note: string;

    // @IsDate()
    // check_in: Date;

    // @IsDate()
    // check_out: Date;

    @IsString()
    check_in: string;

    @IsString()
    check_out: string;

    constructor(data: any) {
        this.room_id = data.room_id;
        this.number_of_guests = data.number_of_guests;
        this.full_name = data.full_name;
        this.phone_number = data.phone_number;
        this.address = data.address;
        this.email = data.email;
        this.note = data.note;
        this.check_in = data.check_in;
        this.check_out = data.check_out;
    }
}
