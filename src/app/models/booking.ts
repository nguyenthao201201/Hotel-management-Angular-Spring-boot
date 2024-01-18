import { BookingDetail } from "../models/booking.detail";
export interface Booking {
    id: number;
    check_in: Date;
    check_out: Date;
    full_name: string;
    phone_number: string;
    email: string;
    address: string;
    note: string;
    status: string;
    total_money: number;
    payment_method: string;
    payment_date: Date;
    is_active: boolean;
    booking_details: BookingDetail[];
}