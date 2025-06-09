import {Injectable} from '@angular/core';
import Dexie, {PromiseExtended, Table} from 'dexie';
import {HallModel} from "../../models/hall.model";
import {MovieModel} from "../../models/movie.model";
import {MovieFactory} from "../../factories/movie.factory";
import {HallFactory} from "../../factories/hall.factory";
import {BookingModel} from "../../models/booking.model";
import {ShowtimeModel} from "../../models/showtime.model";
import {BookingFactory} from "../../factories/booking.factory";
import {ShowtimeFactory} from "../../factories/showtime.factory";
import {BookingSeatModel} from "../../models/bookingSeat.model";
import {BookingSeatFactory} from "../../factories/bookingSeat.factory";
import {SeatFactory} from "../../factories/seat.factory";
import {UserFactory} from "../../factories/user.factory";
import {ApiService} from "../api/api.service";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {UserModel} from "../../models/user.model";

export interface Booking {
  id: number;
  qrCode: string;
  userId: number;
  showtimeId: number;
}

export interface BookingSeat {
  id: number;
  bookingId: number;
  seatId: number;
}

export interface Hall {
  id: number;
  number: number;
  showtimeId: number|null;
}

export interface Movie {
  id: number;
  title: string;
  imageURL: string;
  showtimeId: number;
}

export interface Seat {
  id: number;
  row: string;
  number: number;
}

export interface Showtime {
  id: number;
  startTime: Date;
  endTime: Date;
  movieId: number;
  hallId: number;
  bookingId: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {
  bookings!: Table<Booking, number>;
  bookingSeats!: Table<BookingSeat, number>;
  halls!: Table<Hall, number>;
  movies!: Table<Movie, number>;
  seats!: Table<Seat, number>;
  showtimes!: Table<Showtime, number>;
  users!: Table<User, number>;

  public constructor(private readonly apiService: ApiService,
                     private readonly localStorageService: LocalStorageService,
                     private readonly bookingFactory: BookingFactory,
                     private readonly bookingSeatFactory: BookingSeatFactory,
                     private readonly hallFactory: HallFactory,
                     private readonly movieFactory: MovieFactory,
                     private readonly seatFactory: SeatFactory,
                     private readonly showtimeFactory: ShowtimeFactory,
                     private readonly userFactory: UserFactory) {
    super('CinephoriaDatabase');
    this.version(1).stores({
      bookings: '++id, userId',
      bookingSeats: '++id, bookingId',
      halls: '++id',
      movies: '++id',
      seats: '++id',
      showtimes: '++id',
      users: '++id',
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

  public async populateDatabase(): Promise<void> {

    const responseUser = await this.apiService.getUser(this.localStorageService.getJwtToken());

    const user: UserModel = this.userFactory.create(
      responseUser.id, responseUser.firstName, responseUser.lastName
    );

    this.addUser(this.userFactory.create(user.id, user.firstName, user.lastName));

    const bookings: BookingModel[] = await this.apiService.getBookings(user.id);

    for (const booking of bookings) {

      this.addBooking(this.bookingFactory.create(booking.id, booking.qrCode, booking.user.id, booking.showtime.id));

      const showtime: ShowtimeModel = booking.showtime;
      this.addShowtime(
        this.showtimeFactory.create(
          showtime.id, showtime.startTime, showtime.endTime, showtime.movie.id, showtime.hall.id, booking.id
        )
      );

      const movie: MovieModel = showtime.movie;
      if (movie) {
        this.addMovie(this.movieFactory.create(movie.id, movie.title, movie.imageURL, showtime.id));
      }

      booking.bookingSeats.forEach((bookingSeat: BookingSeatModel) => {
        const seat = bookingSeat.seat;
        this.addBookingSeat(this.bookingSeatFactory.create(bookingSeat.id, booking.id, bookingSeat.seat.id));

        this.addSeat(this.seatFactory.create(seat.id, seat.row, seat.number));
      });

      const hall: HallModel = showtime.hall;

      this.addHall(this.hallFactory.create(hall.id, hall.number, showtime.id));

    }

  }

  public addUser(user: User): void {
    if (user.id !== null) {
      if (this.users.get(user.id) !== null) {
        this.users.delete(user.id);
      }

      this.users.add(user, user.id);
    }
  }

  public getUser(id: number): PromiseExtended<User|undefined> {
    return this.users.get(id);
  }

  public addBooking(booking: Booking): void {
    if (booking.id !== null) {
      if (this.bookings.get(booking.id) !== null) {
        this.bookings.delete(booking.id);
      }

      this.bookings.add(booking, booking.id);
    }
  }

  public getBookingSeats(bookingId: number): PromiseExtended<BookingSeat[]> {
    return this.bookingSeats.where("bookingId").equals(bookingId).toArray();
  }

  public addBookingSeat(bookingSeat: BookingSeat): void {
    if (bookingSeat.id !== null) {
      if (this.bookingSeats.get(bookingSeat.id) !== null) {
        this.bookingSeats.delete(bookingSeat.id);
      }

      this.bookingSeats.add(bookingSeat, bookingSeat.id);
    }
  }

  public getSeat(seatId: number): PromiseExtended<Seat|undefined> {
    return this.seats.get(seatId);
  }

  public addSeat(seat: Seat): void {
    if (seat.id !== null) {
      if (this.seats.get(seat.id) !== null) {
        this.seats.delete(seat.id);
      }

      this.seats.add(seat, seat.id);
    }
  }

  public getHall(id: number): PromiseExtended<Hall|undefined> {
    return this.halls.get(id);
  }

  public addHall(hall: Hall): void {
    if (hall.id !== null) {
      if (this.halls.get(hall.id) !== null) {
        this.halls.delete(hall.id);
      }

      this.halls.add(hall, hall.id);
    }
  }

  public getBookings(userId: number): PromiseExtended<Booking[]> {
    return this.bookings.where("userId").equals(userId).toArray();
  }

  public getBooking(id: number): PromiseExtended<Booking|undefined> {
    return this.bookings.get(id);
  }

  public getShowtime(id: number): PromiseExtended<Showtime|undefined> {
    return this.showtimes.get(id);
  }

  public addShowtime(showtime: Showtime): void {
    if (showtime.id !== null) {
      if (this.showtimes.get(showtime.id) !== null) {
        this.showtimes.delete(showtime.id);
      }

      this.showtimes.add(showtime, showtime.id);
    }
  }

  public getMovie(id: number): PromiseExtended<Movie|undefined> {
    return this.movies.get(id);
  }

  public addMovie(movie: Movie): void {
    if (movie.id !== null) {
      if (this.movies.get(movie.id) !== null) {
        this.movies.delete(movie.id);
      }

      this.movies.add(movie, movie.id);
    }
  }

}
