import {Injectable} from "@angular/core";
import {Showtime} from "../services/database/database.service";

@Injectable({
    providedIn: 'root'
})
export class ShowtimeFactory {

    public create(
      id: number,
      startTime: Date,
      endTime: Date,
      movieId: number,
      hallId: number,
      bookingId: number
    ): Showtime {
      return {
        id: id,
        startTime: startTime,
        endTime: endTime,
        movieId: movieId,
        hallId: hallId,
        bookingId: bookingId
      }
    }

}
