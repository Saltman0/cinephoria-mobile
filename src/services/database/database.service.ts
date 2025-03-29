import {Injectable} from '@angular/core';
import Dexie, {PromiseExtended, Table} from 'dexie';
import {UserModel} from "../../models/user.model";
import {HallModel} from "../../models/hall.model";
import {ShowtimeModel} from "../../models/showtime.model";
import {MovieModel} from "../../models/movie.model";
import {ShowtimeFactory} from "../../factories/showtime.factory";
import {MovieFactory} from "../../factories/movie.factory";
import {BookingModel} from "../../models/booking.model";
import {SeatModel} from "../../models/seat.model";
import {BookingSeatModel} from "../../models/bookingSeat.model";
import {BookingSeatFactory} from "../../factories/bookingSeat.factory";
import {SeatFactory} from "../../factories/seat.factory";
import {HallFactory} from "../../factories/hall.factory";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {
  bookings!: Table<BookingModel, number>;
  bookingSeats!: Table<BookingSeatModel, number>;
  halls!: Table<HallModel, number>;
  movies!: Table<MovieModel, number>;
  seats!: Table<SeatModel, number>;
  showtimes!: Table<ShowtimeModel, number>;
  users!: Table<UserModel, number>;

  public constructor(
    private readonly bookingSeatFactory: BookingSeatFactory,
    private readonly hallFactory: HallFactory,
    private readonly movieFactory: MovieFactory,
    private readonly seatFactory: SeatFactory,
    private readonly showtimeFactory: ShowtimeFactory
  ) {
    super('CinephoriaDatabase');
    this.version(1).stores({
      bookings: '++id, qrCode',
      bookingSeats: '++id',
      halls: '++id, number',
      movies: '++id, title, imageUrl',
      seats: '++id, number, row',
      showtimes: '++id, startTime, endTime',
      users: '++id, firstName, lastName',
    });
  }

  public openDatabase(): void {
    this.open();
  }

  public closeDatabase(): void {
    this.close();
  }

  public deleteDatabase(): void {
    this.delete();
  }

  public populateDatabase(bookings: BookingModel[]): void {

    bookings.forEach((booking: BookingModel) => {

      this.addBooking(booking);

      const showtime: ShowtimeModel = booking.showtime;
      this.addShowtime(
        this.showtimeFactory.create(
          showtime.id, showtime.movie, showtime.startTime, showtime.endTime, showtime.hall, booking
        )
      );

      const movie: MovieModel = showtime.movie;
      if (movie) {
        this.addMovie(this.movieFactory.create(movie.id, movie.title, movie.imageUrl, showtime));
      }

      booking.bookingSeats.forEach((bookingSeat: BookingSeatModel) => {
        const seat = bookingSeat.seat;
        this.addBookingSeat(this.bookingSeatFactory.create(bookingSeat.id, bookingSeat.booking, bookingSeat.seat));

        this.addSeat(this.seatFactory.create(seat.id, seat.row, seat.number, seat.bookingSeats));
      });

      const hall: HallModel = showtime.hall;

      this.addHall(this.hallFactory.create(hall.id, hall.number, showtime));

    });

  }

  public addUser(user: UserModel): void {
    if (user.id !== null) {
      if (this.users.get(user.id) !== null) {
        this.users.delete(user.id);
      }

      this.users.add(user, user.id);
    }
  }

  public getUser(id: number): PromiseExtended<UserModel | undefined> {
    return this.users.get(id);
  }

  public addBooking(booking: BookingModel): void {
    if (booking.id !== null) {
      if (this.bookings.get(booking.id) !== null) {
        this.bookings.delete(booking.id);
      }

      this.bookings.add(booking, booking.id);
    }
  }

  public addBookingSeat(bookingSeat: BookingSeatModel): void {
    if (bookingSeat.id !== null) {
      if (this.bookingSeats.get(bookingSeat.id) !== null) {
        this.bookingSeats.delete(bookingSeat.id);
      }

      this.bookingSeats.add(bookingSeat, bookingSeat.id);
    }
  }

  public addSeat(seat: SeatModel): void {
    if (seat.id !== null) {
      if (this.seats.get(seat.id) !== null) {
        this.seats.delete(seat.id);
      }

      this.seats.add(seat, seat.id);
    }
  }

  public addHall(hall: HallModel): void {
    if (hall.id !== null) {
      if (this.halls.get(hall.id) !== null) {
        this.halls.delete(hall.id);
      }

      this.halls.add(hall, hall.id);
    }
  }

  public getHalls(): PromiseExtended<HallModel[]> {
    return this.halls.toArray();
  }

  public getHall(id: number): PromiseExtended<HallModel | undefined> {
    return this.halls.get(id);
  }

  public addShowtime(showtime: ShowtimeModel): void {
    if (showtime.id !== null) {
      if (this.showtimes.get(showtime.id) !== null) {
        this.showtimes.delete(showtime.id);
      }

      this.showtimes.add(showtime, showtime.id);
    }
  }

  public addMovie(movie: MovieModel): void {
    if (movie.id !== null) {
      if (this.movies.get(movie.id) !== null) {
        this.movies.delete(movie.id);
      }

      this.movies.add(movie, movie.id);
    }
  }


}
