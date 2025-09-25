import {Injectable} from "@angular/core";
import {ShowtimeModel} from "../models/showtime.model";
import {BookingModel} from "../models/booking.model";
import {UserModel} from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class BookingFactory {

  public create(id: number, user: UserModel, showtime: ShowtimeModel): BookingModel {
    return new BookingModel(id, user, showtime);
  }

}
