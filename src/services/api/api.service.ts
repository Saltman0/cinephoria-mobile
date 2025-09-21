import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {GetBookingsGql} from "../../graphql/get-bookings.gql";
import {BookingModel} from "../../models/booking.model";
import {BookingFactory} from "../../factories/booking.factory";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userApiUrl = environment.USER_API_URL;

  constructor(private readonly getBookingsGql: GetBookingsGql, private readonly bookingFactory: BookingFactory) {}

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

  public async getBookings(userId: number) {

    let bookings: BookingModel[] = [];
    let result = await this.getBookingsGql.watch(
        { userId: userId, showtimeId: null }
    ).result();

    result.data.bookings.forEach((booking: BookingModel) => {
      bookings.push(
        this.bookingFactory.createModel(
          booking.id,
          booking.qrCode,
          booking.showtime,
          booking.user,
          booking.bookingSeats
        )
      );
    });

    return bookings;
  }

}
