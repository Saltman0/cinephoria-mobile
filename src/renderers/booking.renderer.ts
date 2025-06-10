import { Injectable } from "@angular/core";
import {
  Booking,
  BookingSeat,
  DatabaseService,
  Hall,
  Movie,
  Seat,
  Showtime
} from "../services/database/database.service";

@Injectable({
  providedIn: 'root'
})
export class BookingRenderer {

  public constructor(private readonly databaseService: DatabaseService) {}

  public async render(booking: Booking) {
    let movieTitle: string|null = null;
    let movieImage: string|null = null;
    let hallNumber: number|null = null;
    let showtimeDate: string|null = null;
    let showtimeStartHour: string|null = null;
    let showtimeStartMinute: string|null = null;
    let showtimeEndHour: string|null = null;
    let showtimeEndMinute: string|null = null;
    let seats: string|null = null;

    const showtime: Showtime|null = await this.databaseService.getShowtime(booking.showtimeId) ?? null;
    if (showtime !== null) {

      const startTime = new Date(showtime.startTime);
      const endTime = new Date(showtime.endTime);

      const day: string = startTime.getDate().toString().padStart(2, "0");
      const month: string = (startTime.getMonth() + 1).toString().padStart(2, "0");
      const year: string = startTime.getFullYear().toString().padStart(2, "0");
      showtimeDate = day + "/" + month + "/" + year;

      showtimeStartHour = startTime.getHours().toString().padStart(2, "0");
      showtimeStartMinute = startTime.getMinutes().toString().padStart(2, "0");
      showtimeEndHour = endTime.getHours().toString().padStart(2, "0");
      showtimeEndMinute = endTime.getMinutes().toString().padStart(2, "0");

      const hall: Hall|null = await this.databaseService.getHall(showtime.hallId) ?? null;
      if (hall !== null) {
        hallNumber = hall.number;
      }

      const movie: Movie|null = await this.databaseService.getMovie(showtime.movieId) ?? null;
      if (movie !== null) {
        movieTitle = movie.title;
        movieImage = movie.imageURL;
      }
    }

    const bookingSeats: BookingSeat[] = await this.databaseService.getBookingSeats(booking.id);

    let index: number = 0;
    for (const bookingSeat of bookingSeats) {
      const seat: Seat|null = await this.databaseService.getSeat(bookingSeat.seatId) ?? null;
      if (seat !== null) {
        seats = seat.row + seat.number;
      }

      if (index !== bookingSeats.length - 1) {
        seats += "/";
      }

      index++;
    }

    const qrCode = {
      id: booking.id,
      hallNumber: hallNumber,
      movieTitle: movieTitle,
      movieImage: movieImage,
      showtimeDate: showtimeDate,
      showtimeStartHour: showtimeStartHour,
      showtimeStartMinute: showtimeStartMinute,
      showtimeEndHour: showtimeEndHour,
      showtimeEndMinute: showtimeEndMinute,
      seats: seats
    }

    return {
      id: booking.id,
      hallNumber: hallNumber,
      movieTitle: movieTitle,
      movieImage: movieImage,
      showtimeDate: showtimeDate,
      showtimeStartHour: showtimeStartHour,
      showtimeStartMinute: showtimeStartMinute,
      showtimeEndHour: showtimeEndHour,
      showtimeEndMinute: showtimeEndMinute,
      seats: seats,
      qrCode: qrCode
    }
  }

}
