import {ShowtimeModel} from "./showtime.model";
import {BookingSeatModel} from "./bookingSeat.model";
import {UserModel} from "./user.model";

export class BookingModel {
    id: number;
    qrCode: string;
    showtime: ShowtimeModel;
    user: UserModel;
    bookingSeats: BookingSeatModel[];

    constructor(id: number, qrCode: string, showtime: ShowtimeModel, user: UserModel, bookingSeats: BookingSeatModel[]) {
        this.id = id;
        this.qrCode = qrCode;
        this.showtime = showtime;
        this.user = user;
        this.bookingSeats = bookingSeats;
    }
}
