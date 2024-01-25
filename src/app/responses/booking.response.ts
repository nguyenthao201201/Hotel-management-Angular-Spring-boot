import { BookingDetail } from "../models/booking.detail";
export interface BookingResponse {
    id: number;
    user_id: number;
    full_name: string;
    phone_number: string;
    address: string;
    check_in: Date;
    check_out: Date;
    // check_in: string;
    // check_out: string;
    email: string;
    status: string;
    total_money: number;
    payment_method: string;
    payment_date: Date;
    note: string;
    is_active: boolean;
    booking_details: BookingDetail[];
}