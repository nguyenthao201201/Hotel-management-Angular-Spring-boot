import { Room } from "./room";
import { Booking } from "./booking";
export interface BookingDetail {
    id: number;
    room: Room;
    booking: Booking;
    price: number;
    number_of_days: number;
    total_money: number;
    total_price_room: number;
}