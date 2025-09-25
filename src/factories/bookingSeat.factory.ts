import {Injectable} from "@angular/core";
import {BookingModel} from "../models/booking.model";
import {SeatModel} from "../models/seat.model";
import {BookingSeatModel} from "../models/bookingSeat.model";

@Injectable({
    providedIn: 'root'
})
export class BookingSeatFactory {

  public create(id: number, booking: BookingModel, seat: SeatModel): BookingSeatModel {
    return new BookingSeatModel(id, booking, seat);
  }

}
