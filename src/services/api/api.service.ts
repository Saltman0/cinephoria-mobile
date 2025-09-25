import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {GetBookingsGql} from "../../graphql/get-bookings.gql";
import {BookingModel} from "../../models/booking.model";
import {environment} from "../../environments/environment";
import {BookingSeatModel} from "../../models/bookingSeat.model";
import {BookingSeatFactory} from "../../factories/bookingSeat.factory";
import {BookingFactory} from "../../factories/booking.factory";
import {GetBookingSeatsGql} from "../../graphql/get-bookingseats.gql";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userApiUrl = environment.USER_API_URL;

  constructor(
    private readonly getBookingsGql: GetBookingsGql,
    private readonly getBookingSeatsGql: GetBookingSeatsGql,
    private readonly bookingFactory: BookingFactory,
    private readonly bookingSeatFactory: BookingSeatFactory) {}

  public async login(email: string, password: string): Promise<any> {
    const response: Response = await fetch(this.userApiUrl + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: email, password: password})
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getUser(token: string) {
    let userId: number;
    try {
      userId = jwtDecode<{ id: number }>(token).id;
    } catch (error) {
      throw new Error("Invalid token.");
    }

    const response: Response = await fetch(`${this.userApiUrl}user/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    return response.json();
  }

  public async getBookings(userId: number, showtimeId: number|null) {

    let bookings: BookingModel[] = [];
    let result = await this.getBookingsGql.watch(
        { userId: userId, showtimeId: showtimeId }
    ).result();

    result.data.bookings.forEach((booking: BookingModel) => {
      bookings.push(
        this.bookingFactory.create(
          booking.id,
          booking.user,
          booking.showtime
        )
      );
    });

    return bookings;
  }

  public async getBookingSeats(bookingId: number|null, seatId: number|null): Promise<BookingSeatModel[]> {

    let bookingSeats: BookingSeatModel[] = [];
    let result = await this.getBookingSeatsGql.watch(
      { bookingId: bookingId, seatId: seatId }
    ).result();

    result.data.bookingSeats.forEach((bookingSeat: BookingSeatModel) => {
      bookingSeats.push(
        this.bookingSeatFactory.create(
          bookingSeat.id,
          bookingSeat.booking,
          bookingSeat.seat
        )
      );
    });

    return bookingSeats;
  }

}
