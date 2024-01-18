import {
    IsString,
    IsPhoneNumber,
    IsNumber,
    IsDate,
    IsEmail
}

from 'class-validator';
export class BookingDTO {

    @IsNumber()
    user_id: number;    

    @IsString()
    full_name: string;

    @IsPhoneNumber()
    phone_number: string;

    @IsEmail()
    email: string;

    @IsString()
    address: string;

    @IsString()
    note: string;

    @IsString()
    check_in: string;

    @IsString()
    check_out: string;

    @IsNumber()
    total_money: number;

    @IsString()
    payment_method: string;

    @IsDate()
    payment_date: Date;


    @IsString()
    status: string;


    constructor(data: any) {    
        this.user_id = data.user_id;
        this.full_name = data.full_name;
        this.phone_number = data.phone_number;
        this.email = data.email;
        this.address = data.address;
        this.note = data.note;
        this.check_in = data.check_in;
        this.check_out = data.check_out;
        this.total_money = data.total_money;
        this.payment_method = data.payment_method;
        this.payment_date = data.payment_date;
        this.status = data.status;
    }
}