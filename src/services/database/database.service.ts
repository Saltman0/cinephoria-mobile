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
import {SeatModel} from "../../models/seat.model";
import {CinemaModel} from "../../models/cinema.model";
import {CategoryModel} from "../../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {
  bookings!: Table<BookingModel, number>;
  bookingSeats!: Table<BookingSeatModel, number>;
  cinemas!: Table<CinemaModel, number>;
  halls!: Table<HallModel, number>;
  seats!: Table<SeatModel, number>;
  categories!: Table<CategoryModel, number>;
  movies!: Table<MovieModel, number>;
  showtimes!: Table<ShowtimeModel, number>;
  users!: Table<UserModel, number>;

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
      bookings: '++id, user, showtime',
      bookingSeats: '++id, booking, seat',
      cinemas: '++id',
      halls: '++id, cinema',
      seats: '++id, hall',
      categories: '++id',
      movies: '++id, category',
      showtimes: '++id, movie, hall',
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
      responseUser.id,
      responseUser.email,
      "*************",
      responseUser.firstName,
      responseUser.lastName,
      responseUser.phoneNumber,
      responseUser.role
    );

    this.addUser(
      this.userFactory.create(
        user.id,
        user.email,
        user.password,
        user.firstName,
        user.lastName,
        user.phoneNumber,
        user.role
      )
    );

    const bookings: BookingModel[] = await this.apiService.getBookings(user.id, null);

    for (const booking of bookings) {

      this.addBooking(this.bookingFactory.create(booking.id, booking.user, booking.showtime));

      const showtime: ShowtimeModel = booking.showtime;
      this.addShowtime(
        this.showtimeFactory.create(
          showtime.id, showtime.startTime, showtime.endTime, showtime.price, showtime.movie, showtime.hall
        )
      );

      const movie: MovieModel = showtime.movie;
      if (movie) {
        this.addMovie(this.movieFactory.create(movie.id, movie.title, movie.description, movie.minimumAge, movie.favorite, movie.imageURL, movie.category));
      }

      const bookingSeats: BookingSeatModel[] = await this.apiService.getBookingSeats(booking.id, null);

      bookingSeats.forEach((bookingSeat: BookingSeatModel) => {
        const seat = bookingSeat.seat;
        this.addBookingSeat(this.bookingSeatFactory.create(bookingSeat.id, bookingSeat.booking, bookingSeat.seat));

        this.addSeat(this.seatFactory.create(seat.id, seat.row, seat.number, seat.hall));
      });

      const hall: HallModel = showtime.hall;

      this.addHall(this.hallFactory.create(hall.id, hall.number, hall.projectionQuality, hall.cinema));

    }

  }

  private addUser(user: UserModel): void {
    if (user.id !== null) {
      if (this.users.get(user.id) !== null) {
        this.users.delete(user.id);
      }

      this.users.add(user, user.id);
    }
  }

  public getUser(id: number): PromiseExtended<UserModel|undefined> {
    return this.users.get(id);
  }

  private addBooking(booking: BookingModel): void {
    if (booking.id !== null) {
      if (this.bookings.get(booking.id) !== null) {
        this.bookings.delete(booking.id);
      }

      this.bookings.add(booking, booking.id);
    }
  }

  public getBookingSeats(bookingId: number): PromiseExtended<BookingSeatModel[]> {
    return this.bookingSeats.where("bookingId").equals(bookingId).toArray();
  }

  private addBookingSeat(bookingSeat: BookingSeatModel): void {
    if (bookingSeat.id !== null) {
      if (this.bookingSeats.get(bookingSeat.id) !== null) {
        this.bookingSeats.delete(bookingSeat.id);
      }

      this.bookingSeats.add(bookingSeat, bookingSeat.id);
    }
  }

  public getSeat(seatId: number): PromiseExtended<SeatModel|undefined> {
    return this.seats.get(seatId);
  }

  private addSeat(seat: SeatModel): void {
    if (seat.id !== null) {
      if (this.seats.get(seat.id) !== null) {
        this.seats.delete(seat.id);
      }

      this.seats.add(seat, seat.id);
    }
  }

  public getHall(id: number): PromiseExtended<HallModel|undefined> {
    return this.halls.get(id);
  }

  private addHall(hall: HallModel): void {
    if (hall.id !== null) {
      if (this.halls.get(hall.id) !== null) {
        this.halls.delete(hall.id);
      }

      this.halls.add(hall, hall.id);
    }
  }

  public getBookings(userId: number): PromiseExtended<BookingModel[]> {
    return this.bookings.where("userId").equals(userId).toArray();
  }

  public getBooking(id: number): PromiseExtended<BookingModel|undefined> {
    return this.bookings.get(id);
  }

  public getShowtime(id: number): PromiseExtended<ShowtimeModel|undefined> {
    return this.showtimes.get(id);
  }

  private addShowtime(showtime: ShowtimeModel): void {
    if (showtime.id !== null) {
      if (this.showtimes.get(showtime.id) !== null) {
        this.showtimes.delete(showtime.id);
      }

      this.showtimes.add(showtime, showtime.id);
    }
  }

  public getMovie(id: number): PromiseExtended<MovieModel|undefined> {
    return this.movies.get(id);
  }

  private addMovie(movie: MovieModel): void {
    if (movie.id !== null) {
      if (this.movies.get(movie.id) !== null) {
        this.movies.delete(movie.id);
      }

      this.movies.add(movie, movie.id);
    }
  }

}
