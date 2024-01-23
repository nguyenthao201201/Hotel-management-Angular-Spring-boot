import {
    IsString,
    IsNumber,
}

from 'class-validator';
export class RoomDTO {
    
        @IsNumber()
        room_id: number;
    
        @IsNumber()
        price: number;
    
        @IsString()
        room_number: string;
    
        @IsString()
        status: string;
    
        @IsString()
        type: string;
    
        @IsString()
        description: string;
    
        constructor(data: any) {
            this.room_id = data.room_id;
            this.price = data.price;
            this.room_number = data.room_number;
            this.status = data.status;
            this.type = data.type;
            this.description = data.description;
        }
}
