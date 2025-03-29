import { Injectable } from "@angular/core";
import { ShowtimeModel } from "../models/showtime.model";
import { BookingModel } from "../models/booking.model";

@Injectable({
  providedIn: 'root'
})
export class BookingRenderer {

  public render(booking: BookingModel) {
    let seats: string[] = [];
    booking.bookingSeats.forEach(function (bookingSeat, index, array) {
      let seat: string;
      seat = bookingSeat.seat.row + bookingSeat.seat.number;
      if (index !== booking.bookingSeats.length - 1) {
        seat += "/";
      }
      seats.push(seat);
    });

    const showtime: ShowtimeModel | null = booking.showtime;

    return {
      id: booking.id,
      movieTitle: showtime.movie.title,
      showtimeDate: showtime.startTime.getDate().toString(),
      showtimeStartHour: showtime.startTime.getHours().toString(),
      showtimeEndHour: showtime.endTime.getHours().toString(),
      hallNumber: showtime.hall.number,
      seats: seats
    }
  }

}
