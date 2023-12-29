import {
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    IsDate
}

from 'class-validator';


export class RegisterDTO {
    @IsString()
    full_name: string;

    @IsPhoneNumber()
    phone_number: string;

    @IsString()
    address: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    retype_password: string;

    @IsDate()
    date_of_birth: Date;
    role_id: number = 1;

    constructor(data: any) {
        this.full_name = data.full_name;
        this.phone_number = data.phone_number;
        this.address = data.address;
        this.password = data.password;
        this.retype_password = data.retype_password;
        this.date_of_birth = data.date_of_birth;
        this.role_id = data.role_id || 2;

    }
}
