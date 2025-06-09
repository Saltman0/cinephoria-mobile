import {Injectable} from "@angular/core";
import {BookingSeat} from "../services/database/database.service";

@Injectable({
    providedIn: 'root'
})
export class BookingSeatFactory {

    public create(id: number, bookingId: number, seatId: number): BookingSeat {
      return {
        id: id,
        bookingId: bookingId,
        seatId: seatId
      }
    }

}
