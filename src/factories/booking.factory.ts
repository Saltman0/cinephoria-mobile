import {Injectable} from "@angular/core";
import {Booking} from "../services/database/database.service";
import {BookingSeatModel} from "../models/bookingSeat.model";
import {ShowtimeModel} from "../models/showtime.model";
import {BookingModel} from "../models/booking.model";
import {UserModel} from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class BookingFactory {

    public create(id: number, qrCode: string, userId: number, showtimeId: number): Booking {
      return {
        id: id,
        qrCode: qrCode,
        userId: userId,
        showtimeId: showtimeId
      }
    }

  public createModel(
    id: number,
    qrCode: string,
    showtime: ShowtimeModel,
    user: UserModel,
    bookingSeats: BookingSeatModel[]
  ): BookingModel {
    return new BookingModel(id, qrCode, showtime, user, bookingSeats);
  }

}
