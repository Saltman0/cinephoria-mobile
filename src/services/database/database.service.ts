import {Injectable} from '@angular/core';
import Dexie, {PromiseExtended, Table} from 'dexie';
import {ApiService} from "../api/api.service";
import {LocalStorageService} from "../local-storage/local-storage.service";

export interface Booking {
  id: number;
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
  hallId: number;
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
  email: string;
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

  public constructor(
      private readonly apiService: ApiService,
      private readonly localStorageService: LocalStorageService
  ) {
    super('CinephoriaDatabase');
    this.version(1).stores({
      bookings: '++id, userId, showtimeId',
      bookingSeats: '++id, bookingId, seatId',
      halls: '++id, cinemaId',
      seats: '++id, hallId',
      movies: '++id, showtimeId',
      showtimes: '++id, hallId, bookingId',
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

    this.addUser({
      id: responseUser.id,
      email: responseUser.email,
      firstName: responseUser.firstName,
      lastName: responseUser.lastName
    });

    const bookings: Booking[] = await this.apiService.getBookings(responseUser.id, null);

    for (const booking of bookings) {

      this.addBooking({id: booking.id, userId: booking.userId, showtimeId: booking.showtimeId});

      const showtime: Showtime = await this.apiService.getShowtime(booking.showtimeId);
      this.addShowtime({
        id: showtime.id,
        startTime: showtime.startTime,
        endTime: showtime.endTime,
        movieId: showtime.movieId,
        hallId: showtime.hallId,
        bookingId: booking.id
      });

      const movie: Movie = await this.apiService.getMovie(showtime.movieId);
      this.addMovie({id: movie.id, title: movie.title, imageURL: movie.imageURL, showtimeId: showtime.id});

      const bookingSeats: BookingSeat[] = await this.apiService.getBookingSeats(booking.id);

      for (const bookingSeat of bookingSeats) {
        const seat: Seat = await this.apiService.getSeat(bookingSeat.seatId);
        this.addBookingSeat({id: bookingSeat.id, bookingId: booking.id, seatId: bookingSeat.seatId});
        this.addSeat({id: seat.id, row: seat.row, number: seat.number, hallId: seat.hallId});
      }

      const hall: Hall = await this.apiService.getHall(showtime.hallId);
      this.addHall({id: hall.id, number: hall.number, showtimeId: showtime.id});
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
